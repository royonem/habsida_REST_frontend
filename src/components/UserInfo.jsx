export default function UserInfo({user}) {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-9">
                <div className="card shadow-sm p-4">
                    <h3 className="mb-4">About User</h3>
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Country</th>
                                <th>Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.country}</td>
                                <td>{user.roleNames}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
