import React, { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes'ı ekledik
import RegistrationSearchBarTeacher from './RegistrationSearchBarTeacher';
import EditIcon from '../../../../../assets/images/pencil.svg';
import FilterIcon from '../../../../../assets/images/filter.svg';
import DeleteIcon from '../../../../../assets/images/delete.svg'; // Silme ikonu ekliyoruz
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/RegistrationModule.css';
import { useNavigate } from 'react-router-dom';

const TeacherRegistration = ({ addTeacher, editTeacher, deleteTeacher, teachers }) => { // deleteTeacher prop olarak alıyoruz
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDepartmentFilterChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleDeleteClick = (teacher) => {
    // Kullanıcıdan onay alıyoruz
    const confirmed = window.confirm(`Öğretmen ${teacher.name} silmek istediğinize emin misiniz?`);
    if (confirmed) {
      deleteTeacher(teacher.id); // Öğretmeni sil
      alert('Öğretmen başarıyla silindi!');
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const teacherName = teacher.name?.toLowerCase() || '';
    const teacherTc = teacher.tc || '';
    return (
      (teacherName.includes(searchTerm) || teacherTc.includes(searchTerm)) &&
      (selectedDepartment ? teacher.department === selectedDepartment : true)
    );
  });

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddTeacher = () => {
    navigate('/dashboard/registration/teacher/add');
  };

  const handleEditTeacher = (teacher) => {
    navigate('/dashboard/registration/teacher/edit', { state: { teacher } });
  };

  return (
    <div className="registration-module-container">
      <h1>Kayıt Modülü</h1>
      <div className="teacher-registration-container">
        <div className="teacher-header">
          <h2>Öğretmenler</h2>
          <div className="header-buttons">
            <button className="module-button" onClick={handleAddTeacher}>
              Öğretmen Ekle
            </button>
            <div className="filter-container">
              <select
                className="filter-select"
                value={selectedDepartment}
                onChange={handleDepartmentFilterChange}
              >
                <option value="">Tüm Bölümler</option>
                {[
                  'Matematik',
                  'Fen Bilimleri',
                  'Türkçe',
                  'Sosyal Bilgiler',
                  'İngilizce',
                ].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <img src={FilterIcon} alt="Filter" className="filter-icon" />
            </div>
          </div>
        </div>
        <div className="search-container">
          <RegistrationSearchBarTeacher
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="teacher-list">
          {currentTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-item">
              <span>{teacher.name}</span>
              <button
                className="edit-button"
                onClick={() => handleEditTeacher(teacher)}
              >
                <img src={EditIcon} alt="Edit" />
              </button>
              <button className="delete-button" onClick={() => handleDeleteClick(teacher)}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Önceki
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes tanımları
TeacherRegistration.propTypes = {
  addTeacher: PropTypes.func.isRequired,
  editTeacher: PropTypes.func.isRequired,
  deleteTeacher: PropTypes.func.isRequired, // deleteTeacher fonksiyonunun gerekliliği belirtiliyor
  teachers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      tc: PropTypes.string, // Zorunlu değilse opsiyonel bırakabilirsiniz
    })
  ).isRequired,
};

export default TeacherRegistration;
