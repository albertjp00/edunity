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
    price: '',
    thumbnail: '',
    modules: [],
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addModule = () => {
    setForm({
      ...form,
      modules: [...form.modules, { title: '', lessons: [] }],
    });
  };

  const removeModule = (indexToRemove) => {
    const updatedModules = form.modules.filter((_, index) => index !== indexToRemove);
    setForm({ ...form, modules: updatedModules });
  };

  const updateModuleTitle = (index, value) => {
    const modules = [...form.modules];
    modules[index].title = value;
    setForm({ ...form, modules });
  };

  const addLesson = (moduleIndex) => {
    const modules = [...form.modules];
    modules[moduleIndex].lessons.push({ title: '', videoUrl: '', content: '' });
    setForm({ ...form, modules });
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const modules = [...form.modules];
    modules[moduleIndex].lessons = modules[moduleIndex].lessons.filter((_, idx) => idx !== lessonIndex);
    setForm({ ...form, modules });
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const modules = [...form.modules];
    modules[moduleIndex].lessons[lessonIndex][field] = value;
    setForm({ ...form, modules });
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.description.trim() || !form.price) {
      toast.error('Please fill all course details.');
      return false;
    }

    for (let m = 0; m < form.modules.length; m++) {
      const module = form.modules[m];
      if (!module.title.trim()) {
        toast.error(`Module ${m + 1} title is required.`);
        return false;
      }

      for (let l = 0; l < module.lessons.length; l++) {
        const lesson = module.lessons[l];
        if (!lesson.title.trim() || !lesson.videoUrl.trim()) {
          toast.error(`Lesson ${l + 1} in Module ${m + 1} must have a title and video URL.`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const instructorId = localStorage.getItem('instructor');

      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('thumbnail', form.thumbnail);
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

      <label>Price</label>
      <input name="price" placeholder="Price" type="number" onChange={handleChange} value={form.price} />

      <label>Thumbnail</label>
      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={e => setForm({ ...form, thumbnail: e.target.files[0] })}
      />

      <hr />

      <h3>Modules</h3>
      {form.modules.map((module, mIndex) => (
        <div key={mIndex} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Module Title"
            value={module.title}
            onChange={e => updateModuleTitle(mIndex, e.target.value)}
          />

          <h4>Lessons</h4>
          {module.lessons.map((lesson, lIndex) => (
            <div key={lIndex} style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
              <input
                type="text"
                placeholder="Lesson Title"
                value={lesson.title}
                onChange={e => updateLesson(mIndex, lIndex, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Video URL"
                value={lesson.videoUrl}
                onChange={e => updateLesson(mIndex, lIndex, 'videoUrl', e.target.value)}
              />
              <textarea
                placeholder="Content"
                value={lesson.content}
                onChange={e => updateLesson(mIndex, lIndex, 'content', e.target.value)}
              />
              <button type="button" onClick={() => removeLesson(mIndex, lIndex)} >
                 Remove Lesson
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addLesson(mIndex)}>
            + Add Lesson
          </button>
          <button type="button" onClick={() => removeModule(mIndex)} >
            Remove This Module
          </button>
        </div>
      ))}

      <button type="button" onClick={addModule}>
        + Add Module
      </button>

      <br /><br />
      <button className='add-course-btn' type="submit">Save</button>
    </form>
  );
};

export default EditCourse;
