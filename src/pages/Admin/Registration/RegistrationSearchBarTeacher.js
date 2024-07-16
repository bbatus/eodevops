import React from 'react';
import '../../../assets/styles/Admin/RegistrationSearchBar.css';

const RegistrationSearchBarTeacher = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="registration-search-box">
      <input
        type="text"
        placeholder="Öğretmen adı veya TC kimlik no ile ara"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default RegistrationSearchBarTeacher;