import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [ToDo, setName] = useState("");
  const [kuwasiku, setMail] = useState("");
  const navigate = useNavigate(); // ページ遷移用

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Todo"), {
        ToDo,
        kuwasiku,
      });
      alert("ユーザーを追加しました");
      navigate("/"); // 追加後トップページへ戻る
    } catch (error) {
      alert("追加に失敗しました: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">ユーザー追加</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">ToDo：</label>
          <input
            type="text"
            value={ToDo}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">詳細：</label>
          <input
            type="text"
            value={kuwasiku}
            onChange={(e) => setMail(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          追加
        </button>
      </form>
    </div>
  );
}

export default AddUser;
