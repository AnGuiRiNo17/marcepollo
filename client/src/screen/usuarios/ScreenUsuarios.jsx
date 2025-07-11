import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Card, IconButton, MD3Colors } from "react-native-paper";
import { estadoLoginGlobal } from "../../context/contexData";

export default function ScreenUsuarios() {
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [10, 11, 12, 13, 14, 15];
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const { getDataUsers, dataUsers, deleteUser } = useContext(estadoLoginGlobal);

  useEffect(() => {
    getDataUsers();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (!dataUsers || dataUsers.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  const items = dataUsers;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Card style={styles.card}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title numeric>Email</DataTable.Title>
            <DataTable.Title numeric>Status</DataTable.Title>
            <DataTable.Title numeric>Acciones</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.nombre}</DataTable.Cell>
              <DataTable.Cell numeric>{item.email}</DataTable.Cell>
              <DataTable.Cell numeric>{item.status}</DataTable.Cell>
              <DataTable.Cell numeric>
                <IconButton
                  icon="delete"
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => deleteUser(item)}
                  accessibilityLabel={`Eliminar usuario ${item.nombre}`}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={setPage}
            label={`${from + 1}-${to} de ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Usuarios por página"}
          />
        </DataTable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1C1C1E",
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    fontSize: 18,
    color: "#7C3AED",
    fontWeight: "600",
  },
});
