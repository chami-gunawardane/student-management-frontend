import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentTable from './pages/studentTable';
import AddStudent from './pages/addStudent';
import EditStudent from './pages/editStudent'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
