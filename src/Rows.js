import { RiDeleteBin6Line } from "react-icons/ri";

const Rows = (props) => {
  const { rowsData, deleteItem } = props;
  const deleteIcon = () => {
    deleteItem(rowsData.id);
  };

  return (
    <>
      <tr>
        <td>{rowsData.id}</td>
        <td>{rowsData.userName}</td>
        <td>{rowsData.signedIn}</td>
        <td>{rowsData.role}</td>
        <button onClick={deleteIcon} type="button" className="button2">
          <RiDeleteBin6Line className="Ri" />
        </button>
      </tr>
    </>
  );
};
export default Rows;
