import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { generateUrl } from "../../utils/generateUrl";
import "./style.css";

const UsersList = () => {
  const [users, setUsers] = useState({ isLoading: false, apiResult: [] });
  const [urlParams, setUrlParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const generateUrlValue = generateUrl(
      "https://random-data-api.com/api/users/random_user",
      { size: 100, currentPage: currentPage }
    );
    setUrlParams(generateUrlValue);
  }, [currentPage]);

  useEffect(() => {
    if (window.localStorage !== undefined) {
      const data = window.localStorage.getItem("user");
      if (data !== null) {
        setUsers({ apiResult: JSON.parse(data) });
      }
    }
  }, []);

  useEffect(() => {
    setUsers({ isLoading: true });
    fetch(urlParams)
      .then((res) => res.json())
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        setUsers({
          apiResult: response,
          isLoading: false,
        });
      });
  }, [urlParams]);

  const indexOfLastRecord = currentPage * usersPerPage;
  const indexOfFirstRecord = indexOfLastRecord - usersPerPage;
  const currentRecords = users?.apiResult?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil((users?.apiResult?.length ?? 0) / usersPerPage);

  return (
    <div>
    <h2>  UsersList
      </h2>
      <div className="tableWapper">
        <table>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact no</th>
            <th>DOB</th>
            <th>Job title</th>
            <th>state</th>
          </tr>
          {users.isLoading && <Loader /> }
          {currentRecords?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>
                  <img className="avatarImage" src={user.avatar} alt="" />
                </td>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone_number.replace(' ', '').slice(0, 10)}</td>
                <td>{user.date_of_birth}</td>
                <td>{user.employment.title}</td>
                <td>{user.address.state}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="cardView">
        {users?.apiResult?.map((user)=>{
          return(
        <div className="cardWrapper">
          <div className="cardImage">
            <img className="" src={user.avatar} alt="" />
          </div>
           <h4>
           {`${user.first_name} ${user.last_name}`}
            </h4> 
            <p>Username: <b>{user.username}</b> </p>
            <p>Date of Birth: <b>{user.date_of_birth}</b> </p>
            <p>Gender: <b>{user.gender}</b> </p>
            <p>State: <b>{user.address.state}</b> </p> 
        </div>

          )
        })}
      </div>
      <div className="styledPagination">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      </div>
    </div>
  );
};

export default UsersList;
