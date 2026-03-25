import { useState, useEffect } from "react";
import useMeta from "../../hooks/useMeta.jsx";
import { validatePassword } from "../../api/client.jsx";

export default function EditUserForm({ user, onSave, onCancel }) {
  const { genders, countries, loading } = useMeta();

  const [editForm, setEditForm] = useState({
    id: "",
    username: "",
    age: "",
    gender: "",
    country: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
        country: user.country,
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    validatePassword(editForm.password, editForm.confirmPassword);
    onSave(editForm);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card shadow-sm p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={editForm.id} />

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={editForm.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={editForm.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={editForm.gender || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Gender</option>
            {genders.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <select
            name="country"
            className="form-select"
            value={editForm.country || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Country</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={editForm.password}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={editForm.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}