import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddUser from "./add";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import DeleteUser from "./delete";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [dbUsers, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  const fetchUsers = async () => {
    const usersCol = collection(db, "Todo");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 優先度を変更し、Firestoreを更新
  const handlePriorityChange = async (id, newPriority) => {
    try {
      const userDoc = doc(db, "Todo", id);
      await updateDoc(userDoc, { priority: newPriority });
      fetchUsers(); // 再取得して更新
    } catch (error) {
      console.error("優先度変更エラー:", error);
    }
  };

  return (
    <Router>
      <Navigation />
      <div className="p-4 flex justify-end bg-gray-100">
        {user ? (
          <div>
            <span className="mr-4">こんにちは、{user.displayName} さん</span>
            <button onClick={handleLogout} className="p-2 bg-green-500 text-white rounded">ログアウト</button>
          </div>
        ) : (
          <button onClick={handleLogin} className="p-2 bg-purple-500 text-white rounded">Googleでログイン</button>
        )}
      </div>

      <Routes>
        <Route path="/" element={
          <div>
            <h1 className="text-2xl font-bold text-center mb-4">やることToDoリスト表</h1>
            <table className="border border-gray-300 w-full text-center shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3">ToDo</th>
                  <th className="p-3">詳細</th>
                  <th className="p-3">優先度</th> {/* 優先度カラム追加 */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {user ? (
                  dbUsers.map((todo) => (
                    <tr key={todo.id} className="border-b">
                      <td className="p-3">{todo.ToDo}</td>
                      <td className="p-3">{todo.kuwasiku}</td>
                      <td className="p-3">
                        <select
                          value={todo.priority}
                          onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                          className="border border-gray-300 p-2 rounded-md"
                        >
                          <option value="低">低</option>
                          <option value="中">中</option>
                          <option value="高">高</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-gray-600 mt-4">ログインするとデータが見られます。</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        } />

        {user ? (
          <>
            <Route path="/add" element={<AddUser />} />
            <Route path="/delete" element={<DeleteUser />} />
          </>
        ) : (
          <>
            <Route path="/add" element={<p className="text-center mt-4">ログインしてください</p>} />
            <Route path="/delete" element={<p className="text-center mt-4">ログインしてください</p>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
