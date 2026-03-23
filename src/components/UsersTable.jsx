export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm p-4">
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Username</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Roles</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.age || "-"}</td>
              <td>{u.gender || "-"}</td>
              <td>{u.country || "-"}</td>
              <td>
                {u.roleNames?.map((role, i) => (
                  <span key={i} className="badge bg-secondary me-1">
                    {role.replace("ROLE_", "")}
                  </span>
                )) || "-"}
              </td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => onEdit(u)}>Edit</button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this user?")) {
                      onDelete && onDelete(u);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}