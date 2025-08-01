import React, { useState } from 'react';
import axios from 'axios';
import './addCourses.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    skills:[],
    price: '',
    thumbnail: '',
    level:'Beginner',
    modules: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addModule = () => {
    setForm({
      ...form,
      modules: [...form.modules, { title: '', videoUrl: '', content: '' }],
    });
  };

  const updateModule = (index, field, value) => {
    const updatedModules = [...form.modules];
    updatedModules[index][field] = value;
    setForm({ ...form, modules: updatedModules });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({ ...form, skills: [...form.skills, value] });
    } else {
      setForm({ ...form, skills: form.skills.filter(skill => skill !== value) });
    }
  };



  const validateForm = () => {
    if (!form.title.trim() || !form.description.trim() || !form.price) {
      toast.error('Please fill all course details.');
      return false;
    }

    for (let i = 0; i < form.modules.length; i++) {
      const module = form.modules[i];
      if (!module.title.trim() || !module.videoUrl.trim()) {
        toast.error(`Module ${i + 1} must have a title and video URL.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) return;

    try {
      const instructorId = localStorage.getItem('instructor');
      const formData = new FormData();

      formData.append('instructorId', instructorId);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('skills', JSON.stringify(form.skills));
      formData.append('price', form.price);
      formData.append('level',form.level)
      formData.append('thumbnail', form.thumbnail);
      formData.append('modules', JSON.stringify(form.modules));

      const res = await axios.post('http://localhost:4000/instructor/addCourse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success('Course added');
        navigate('/instructor/home');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding course');
    }
  };

  return (
    <form className="add-course-form" onSubmit={handleSubmit}>
      <h2>Add New Course</h2>

      <label>Course Title</label>
      <input name="title" placeholder="Course Title" onChange={handleChange} />

      <label>Description</label>
      <textarea name="description" placeholder="Course Description" onChange={handleChange}></textarea>

      <label>Skills</label>
        <div className="skills-checkbox-group">
          {["React", "HTML", "CSS", "JavaScript", "Node.js"].map((skill) => (
            <label key={skill} className="skill-checkbox">
              <input
                type="checkbox"
                value={skill}
                checked={form.skills.includes(skill)}
                onChange={handleSkillChange}
              />
              {skill}
            </label>
          ))}
        </div>

        {/* Show selected skills */}
        {form.skills.length > 0 && (
          <div className="selected-skills">
            <p><strong>Selected Skills:</strong></p>
            <ul>
              {form.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        <label htmlFor="level">Course Level</label>
        <select
          className="level"
          name="level"
          value={form.level}
          onChange={handleChange}
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>



      <br/>
      <label>Price</label>
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />

      <label>Thumbnail</label>
      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
      />

      <hr />

      <h3>Modules</h3>
      {form.modules.map((module, index) => (
        <div key={index} className="module-card">
          <input
            type="text"
            placeholder="Module Title"
            value={module.title}
            onChange={(e) => updateModule(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Video URL"
            value={module.videoUrl}
            onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
          />
          <textarea
            placeholder="Module Content"
            value={module.content}
            onChange={(e) => updateModule(index, 'content', e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addModule}>+ Add Module</button>

      <br /><br />
      <button className="add-course-btn" type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
