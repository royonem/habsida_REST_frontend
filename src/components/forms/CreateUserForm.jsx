import useMeta from '../../hooks/useMeta.jsx'

export default function CreateUserForm({ form, setForm, handleSubmit, handleChange, isAdmin = false }) {
    const { genders, countries, loading, roles } = useMeta();
    if (loading) return <div>Loading...</div>;
    const handleRoleChange = (e) => {
        const roleId = Number(e.target.value);
        const checked = e.target.checked;
        
        setForm(prev => ({
            ...prev,
            roleIds: checked
                ? [...prev.roleIds, roleId]
                : prev.roleIds.filter(r => r !== roleId)
        }));
    };

    return (
        <div className="card shadow-sm p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit}>
                <div> <input type="hidden" name="id" value={form.id} /> </div>
                <div className="mb-3"> <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Input username"
                        required
                    />
                </div>
                <div className="mb-3"> <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="Input valid age"
                        required
                    />
                </div>
                <div className="mb-3"> <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        className="form-select"
                        value={form.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Gender</option>
                        {genders.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3"> <label className="form-label">Country</label>
                    <select
                        name="country"
                        className="form-select"
                        value={form.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Country</option>
                        {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3"> <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <div className="mb-3"> <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                {isAdmin && (
                    <div className="mb-3">
                        <label>Roles</label>
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                            {roles.map(role => (
                                <div key={role.id}>
                                    <input
                                        type="checkbox"
                                        value={role.id}
                                        checked={form.roleIds?.includes(role.id)}
                                        onChange={handleRoleChange}
                                    />
                                    {role.name.replace("ROLE_", "")}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
}