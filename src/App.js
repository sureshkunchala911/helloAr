import { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AiOutlineDown, AiOutlineUserAdd } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import Rows from "./Rows.js";
import "./styles.css";
import moment from "moment";

class App extends Component {
  state = {
    data: [
      { id: 1, userName: "Suresh K", role: "owner", signedIn: "within 1Hour" },
      { id: 2, userName: "Vikram", role: "admin", signedIn: "2 days ago" },
      { id: 3, userName: "", role: "sales", signedIn: "" },
      { id: 4, userName: "", role: "sales", signedIn: "" }
    ],
    name: "",
    inputRole: "",
    signedTime: ""
  };

  onChangeInput = (event) => {
    this.setState({ name: event.target.value });
  };

  calling = () => {
    const { data } = this.state;
    localStorage.setItem("user", JSON.stringify(data));
  };

  selectChange = (event) => {
    this.setState({ inputRole: event.target.value });
  };

  deleteItem = (id) => {
    const { data } = this.state;
    const filterData = data.filter((each) => each.id !== id);
    console.log(filterData);
    this.setState({ data: filterData }, this.calling);
  };

  addUser = (event) => {
    event.preventDefault();
    const { name, inputRole, data } = this.state;
    const dataLength = data.length;
    const dateAndTime = new Date();
    const stringName = name.split("@");
    const newData2 = {
      id: dataLength + 1,
      userName: stringName[0],
      signedIn: moment.utc(dateAndTime).local().startOf("seconds").fromNow(),
      role: inputRole
    };
    console.log(newData2.userName);
    this.setState(
      (prevState) => ({
        data: [...prevState.data, newData2]
      }),
      this.calling
    );
    console.log(data);
  };

  render() {
    const data2 = localStorage.getItem("user");
    console.log(data2);
    const newData = JSON.parse(data2);
    const { name, inputRole } = this.state;

    return (
      <div className="App">
        <div className="logoContainer">
          <img
            className="mainLogo"
            alt="mainLogo"
            src="https://res.cloudinary.com/dxwppeplp/image/upload/v1672416241/20221202140729_y0lwyt.webp"
          />
        </div>
        <div className="first">
          <div className="arContainer">
            <img
              className="arLogo"
              alt="arlogo"
              src="https://res.cloudinary.com/dxwppeplp/image/upload/v1672416775/230x0w_qyvrmm.webp"
            />
            <hr className="hr1" />
            <p> MY APPLICATION </p>
            <AiOutlineDown className="arrow" />
          </div>
          <div className="arContainer">
            <hr className="hr1" />
            <RxAvatar className="avatar" />
            <p className="userName"> Suresh kunchala </p>
            <AiOutlineDown className="arrow2" />
          </div>
        </div>
        <hr className="hr2" />
        <div className="section">
          <div className="leftTabs">
            <p className="tabs">Products</p>
            <p className="tabs">Demo Script</p>
            <p className="tabs">Customers</p>
            <p className="tabs">Sales Team</p>
            <p className="tabs">Demos</p>
            <p className="tabs settings">Settings</p>
          </div>
          <hr className="hr3" />
          <div className="section2">
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button userButton">
                    add user
                  </button>
                }
              >
                {(close) => (
                  <>
                    <div className="popUp">
                      <div className="leftSide">
                        <AiOutlineUserAdd className="addUser" />
                        <p className="lorem">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </div>
                      <div className="rightSide">
                        <form className="rightSide" onSubmit={this.addUser}>
                          <p>User Information</p>
                          <label>Email Id of User</label>
                          <input
                            type="text"
                            value={name}
                            onChange={this.onChangeInput}
                          />
                          <label htmlFor="role">Role</label>
                          <select
                            id="role"
                            value={inputRole}
                            onChange={this.selectChange}
                          >
                            <option value="admin">admin</option>
                            <option value="owner">owner</option>
                            <option value="sales">sales</option>
                          </select>
                          <div className="buttons">
                            <button
                              type="button"
                              className="trigger-button closeButton"
                              onClick={() => close()}
                            >
                              Close
                            </button>
                            <button type="submit" className="addButton">
                              Add
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </Popup>
            </div>
            <table>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Last Signed in</th>
                <th>Role</th>
                <th></th>
              </tr>
              {newData.map((each) => (
                <Rows
                  rowsData={each}
                  key={each.id}
                  deleteItem={this.deleteItem}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
