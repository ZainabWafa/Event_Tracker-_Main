// import React, { Component } from 'react';
// import Pagination from "react-js-pagination";
// import firestore from "./Firebase";

// export default class DataList extends Component {

// constructor(props) {
//     super(props);
//     this.state = {
//         dbItems: [],
//         currentPage: 1,
//         itemsPerPage: 3,
//         totalItemCount: 1,
//         activePage: 15
//     }
//     this.handlePageChange = this.handlePageChange.bind(this);
// }

// handlePageChange(pageNumber) {
//     console.log(`active page is ${pageNumber}`);
//     this.setState({ activePage: pageNumber });
// }

// async getItems() {
//     const { currentPage, itemsPerPage } = this.state;
//     const startAt = currentPage * itemsPerPage - itemsPerPage;
//     const usersQuery = firestore.collection('Users').orderBy("email").startAt(startAt).limit(itemsPerPage)
//     const snapshot = await usersQuery.get()
//     const items = snapshot.docs.map(doc => doc.data())
//     return this.setState({ 
//         dbItems: items,
//         totalItemCount: firestore.collection('Users').get().then(res => console.log(res.size))
//     })

// }

// componentDidMount() {
//     this.getItems()
// }

// componentDidUpdate(prevProps, prevState) {
//     const isDifferentPage = this.state.currentPage !== prevState.currentPage
//     if (isDifferentPage) this.getItems()
// }

// render() {
//     return (
//         <div>
//             {this.state.dbItems.map((users, index) => {
//                 return (
//                     <p key={index}>
//                         <b>First Name:</b> {users.firstname} <br />
//                         <b>Email:</b> {users.email}
//                     </p>
//                 )
//             })
//             }
//             <Pagination
//                 activePage={this.state.activePage}
//                 itemsCountPerPage={this.state.itemsPerPage}
//                 totalItemsCount={this.state.totalItemCount}
//                 pageRangeDisplayed={this.state.itemsPerPage}
//                 onChange={this.handlePageChange}
//             />
//         </div>
//     )
// }
// }