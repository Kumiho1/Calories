// контейнернаяя компонента для общения с store и API

import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { follow, setUsers, setCurrPage, setTotalUserCount, toggleIsFetching } from "../../redux/usersReduser";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";



// контейнернаяя компонента для общения с API
let UsersAPIComponent = ({ users, follow, setUsers, setCurrPage,
    setTotalUserCount, pageSize, totalUserCount,
    currentPage, isFetching, toggleIsFetching }) => {

    const pageCount = Math.ceil(totalUserCount / pageSize)

    const onChangePage = (pageNumber) => {
        toggleIsFetching(true)
        setCurrPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`)
            .then((res) => {
                setUsers(res.data.items)
            })
            .then(() => toggleIsFetching(false))
    }

    useEffect(() => {
        toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then((res) => {
                setUsers(res.data.items)
                setTotalUserCount(res.data.totalCount)
            })
            .then(() => toggleIsFetching(false))
    }, [])

    return (
        <>
            <Preloader isFetching={isFetching} />
            <Users
                users={users}
                follow={follow}
                totalUserCount={totalUserCount}

                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage}
                pageCount={pageCount} />
        </>
    )
}


// контейнернаяя компонента для общения с store
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps,
    { follow, setUsers, setCurrPage, setTotalUserCount, toggleIsFetching }
)(UsersAPIComponent);