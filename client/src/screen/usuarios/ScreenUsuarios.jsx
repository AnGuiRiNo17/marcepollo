import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Card, IconButton, MD3Colors } from "react-native-paper";
import { estadoLoginGlobal } from "../../context/contexData";

export default function ScreenUsuarios() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const { getDataUsers, dataUsers, deleteUser } = useContext(estadoLoginGlobal);

  useEffect(() => {
    getDataUsers();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (!dataUsers || dataUsers.length === 0) {
    return <Text style={{ padding: 20 }}>Cargando usuarios...</Text>;
  }

  const items = dataUsers;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Lista de Usuarios</Text>
      <Card>
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
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
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

const styles = StyleSheet.create({});
