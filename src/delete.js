import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function DeleteUser() {
  const [users, setUsers] = useState([]);

  // Firestoreからユーザー一覧を取得
  const fetchUsers = async () => {
    try {
      const usersCol = collection(db, "Todo");
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ユーザー削除関数
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Todo", id));
      alert("削除しました");
      fetchUsers(); // データ再取得
    } catch (error) {
      alert("削除に失敗しました: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-700 mb-5">ユーザー削除ページ</h2>
      <table className="border border-gray-300 w-full max-w-4xl text-center shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 border-b">Todo</th>
            <th className="p-3 border-b">詳細</th>
            <th className="p-3 border-b">操作</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">{user.ToDo}</td>
              <td className="p-3">{user.kuwasiku}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteUser;
