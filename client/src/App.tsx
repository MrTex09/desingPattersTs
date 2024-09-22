import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import Home from './components/Home'; 
import NotFound from './components/notFound'; 
import Register from './components/Register';
import Sidebar from './components/sidebar'; 
import UserList from './components/userList'; 
import { useAuth } from './context/authContext'; 
import './App.css'; 
import BrandForm from './components/brandForm'; 
import CategoryForm from './components/categoryForm'; 
import BrandList from './components/brandList'; 
import CategoryList from './components/categoryList';
import EquipUserList from './components/equipUserList'; 

const App: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <div className="app-container">
        {isAdmin && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/equipments" element={<EquipmentList />} />
            <Route path="/equipUser" element={<EquipUserList />} />
            {isAdmin && (
              <>
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/admin/equipments" element={<EquipmentList />} />
                <Route path="/admin/equipments/new" element={<EquipmentForm />} />
                <Route path="/admin/equipments/edit/:id" element={<EquipmentForm />} />
                <Route path="/admin/brands/new" element={<BrandForm />} />
                <Route path="/admin/categories/new" element={<CategoryForm />} />
                <Route path="/admin/categories" element={<CategoryList />} />
                <Route path="/admin/brands" element={<BrandList />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
