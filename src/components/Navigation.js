// src/components/Navigation.js
// src/components/Navigation.js
import { Link } from 'react-router-dom';
import { FcAddDatabase, FcFullTrash ,FcDebian,FcAndroidOs } from "react-icons/fc"; // ← 使い䛯いアイコンをインポート

function Navigation() {
return (
<nav className="bg-gray-100 pt-6 text-center">
<Link to="/"><FcAndroidOs style={{ display:'inline-block', marginRight: '10px' }} />一覧</Link> |
<Link to="/add"><FcAddDatabase style={{ display:'inline-block', marginRight: '10px' }} />やること追加 </Link> |
<Link to="/delete"><FcDebian style={{ display:'inline-block', marginRight: '10px' }} />やること削除</Link> 
</nav>
);
}

export default Navigation;