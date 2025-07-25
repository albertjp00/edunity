import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editCourse.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    skills:[],
    price: '',
    thumbnail: '',
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

  const removeModule = (indexToRemove) => {
    const updatedModules = form.modules.filter((_, index) => index !== indexToRemove);
    setForm({ ...form, modules: updatedModules });
  };

  const updateModule = (index, field, value) => {
    const modules = [...form.modules];
    modules[index][field] = value;
    setForm({ ...form, modules });
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


    const handleSkillChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
        setForm({ ...form, skills: [...form.skills, value] });
        } else {
        setForm({ ...form, skills: form.skills.filter(skill => skill !== value) });
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('skills', JSON.stringify(form.skills));
      formData.append('price', form.price);

      if (form.thumbnail instanceof File) {
        formData.append('thumbnail', form.thumbnail);
      } else {
        formData.append('thumbnail', form.thumbnail); // or skip if needed
      }

      formData.append('modules', JSON.stringify(form.modules));

      const res = await axios.put(`http://localhost:4000/instructor/editCourse/?id=${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success('Course Updated');
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating course');
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/instructor/courseDetails?id=${id}`);
      if (res.data.success) {
        console.log(res.data.course);
        
        setForm(res.data.course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form className="add-course-form" onSubmit={handleSubmit}>
      <h2>Edit Course</h2>

      <label>Course Title</label>
      <input name="title" placeholder="Course Title" onChange={handleChange} value={form.title} />

      <label>Description</label>
      <textarea name="description" placeholder="Course Description" onChange={handleChange} value={form.description}></textarea>

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


      <label>Price</label>
      <input name="price" placeholder="Price" type="number" onChange={handleChange} value={form.price} />

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
            placeholder="Content"
            value={module.content}
            onChange={(e) => updateModule(index, 'content', e.target.value)}
          />
          <button type="button" onClick={() => removeModule(index)}>Remove Module</button>
        </div>
      ))}

      <button type="button" onClick={addModule}>+ Add Module</button>

      <br /><br />
      <button className="add-course-btn" type="submit">Save</button>
    </form>
  );
};

export default EditCourse;
