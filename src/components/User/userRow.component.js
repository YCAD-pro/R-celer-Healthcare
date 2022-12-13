const UserRowComponent = (props) => {
  return (
    <tr>
      <td>
        <img src={props.img} />
      </td>
      <th>{props.user.status}</th>
      <td>{props.user.username}</td>
      <td>{props.user.mail}</td>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>
    </tr>
  );
};
export default UserRowComponent;

// <th scope="row">2</th>
// <td>Jacob</td>
// <td>Thornton</td>
// <td>@fat</td>
// <form className="container-fluid">
//   <div className="input-group col">
//           <span className="input-group-text" id="basic-addon1">
//           </span>
//     <div className="row">Username :</div>
//     <input
//       type="text"
//       className="form-control"
//       aria-label="Username"
//       aria-describedby="basic-addon1"
//       disabled
//       value="test"
//     />
//   </div>
// </form>
