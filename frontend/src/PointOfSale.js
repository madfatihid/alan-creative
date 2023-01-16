// import logo from './logo.svg';
import { FaEquals, FaListUl } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs'
import { TbDiscount2 } from 'react-icons/tb';
import { MdKeyboardArrowDown } from 'react-icons/md'
import './App.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import ReactToPrint from "react-to-print";

function getNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// function Block(props) {
//     if (props.type === 'product') {
//         return <div className='block button'>
//             <div className='image' style={{ backgroundImage: "url(https://picsum.photos/id/225/200)" }}></div>
//             <div className='caption'>{props.name}</div>
//         </div>;
//     } else if (props.type === 'category') {
//         return <div className='block button'>
//             <div className='image'>{props.name.substring(0, 2)}</div>
//             <div className='caption'>{props.name}</div>
//         </div>;
//     } else if (props.type === 'discount') {
//         return <div className='block button'>
//             <div className='image'><TbDiscount2 /></div>
//             <div className='caption'>{props.name}</div>
//         </div>;
//     }
//     return <div className='block'></div>;
// }

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function PointOfSale() {
    let componentRef = useRef();
    axios.defaults.baseURL = 'http://localhost:8000/api';
    const [blocks, setBlocks] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [productBill, setProductBill] = useState({});
    const [charge, setCharge] = useState(0);

    useEffect(() => {
        axios.get('/blocks').then((response) => {
            setBlocks(response.data);
        });
    }, []);

    useEffect(() => {
        let subtotal = 0;
        Object.keys(productBill).map((keyName, i) => {
            subtotal += productBill[keyName].amount * productBill[keyName].price;
        });
        setSubTotal(subtotal);
        let total = subtotal - (subtotal * discount / 100);
        setTotal(total);
        console.log(productBill);
    }, [productBill, discount]);

    const [saveBillModal, setSaveBillModal] = useState(false);
    const [chargeModal, setChargeModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [categoryProducts, setCategoryProducts] = useState([]);

    // function openModal() {
    //     setSaveBillModal(true);
    // }
    function loadCateogryProduct(id) {
        setCategoryProducts([]);
        axios.get(`/categories/${id}`).then((response) => {
            setCategoryProducts(response.data);
        });
        setCategoryModal(true);
    }

    function closeModal() {
        setSaveBillModal(false);
        setChargeModal(false);
        setCategoryModal(false);
    }

    function addProductBill(id, name, price) {
        setProductBill((prevState) => {
            var amount = 0;
            if (typeof productBill["p" + id] != "undefined")
                amount = productBill["p" + id]['amount']
            amount++;
            return ({
                ...prevState,
                ["p" + id]: {
                    'name': name,
                    'price': price,
                    'amount': amount
                }
            });
        });
    }

    return (
        <>
            <div className="row main">
                <div className="products">
                    {blocks.map((block) => {
                        if (block.product != null) {
                            return (
                                <div className='block button' onClick={() => addProductBill(block.product.id, block.product.name, block.product.price)}>
                                    <div className='image' style={{ backgroundImage: `url(http://localhost:8000/image/${block.product.id})` }}></div>
                                    <div className='caption'>{block.product.name}</div>
                                </div>
                            );
                        } else if (block.category != null) {
                            return (
                                <div className='block button' onClick={() => loadCateogryProduct(block.category.id)}>
                                    <div className='image'>{block.category.name.substring(0, 2)}</div>
                                    <div className='caption'>{block.category.name}</div>
                                </div>
                            );
                        } else if (block.discount != null) {
                            return (
                                <div className='block button' onClick={() => setDiscount(block.discount.percentage)}>
                                    <div className='image'><TbDiscount2 /></div>
                                    <div className='caption'>{block.discount.name}</div>
                                </div>
                            );
                        }
                        return <div className='block'></div>;
                    })}
                </div>
                <div className="bill">
                    <div className='content column'>
                        <div>
                            <div className='row top'>
                                <div className="icon-button">
                                    <BsPersonCircle />
                                    Customer
                                </div>
                                <div>
                                    New Customer
                                </div>
                                <div className="icon-button">
                                    <FaListUl />
                                    Billing List
                                </div>
                            </div>
                            <div className='dine-in'>
                                Dine In
                                <MdKeyboardArrowDown style={{ color: "#5d97db", verticalAlign: 'middle' }} />
                            </div>
                        </div>
                        <div style={{ flex: 1, maxHeight: 'calc(100% - (250px))' }}>
                            <div className='list' ref={(el) => (componentRef = el)}>
                                <table style={{ width: '100%', tableLayout: 'auto' }}>
                                    <tr style={{ color: "#5d97db" }}>
                                        <td>1</td>
                                        <td></td>
                                        <td>View Table</td>
                                    </tr>
                                    {Object.keys(productBill).map((keyName, i) => (
                                        <tr key={i}>
                                            <td>{productBill[keyName].name}</td>
                                            <td>{productBill[keyName].amount > 1 ? "x" + productBill[keyName].amount : ""}</td>
                                            <td>Rp {getNumberWithCommas(productBill[keyName].price)}</td>
                                            {/* key: {i} Name: {productBill[keyName].name} */}
                                        </tr>
                                    ))}
                                </table>
                                <table style={{ width: '100%', tableLayout: 'auto' }}>
                                    <tr>
                                        <td>Sub-Total: </td>
                                        <td>Rp {getNumberWithCommas(subTotal)}</td>
                                    </tr>
                                    {discount > 0 ? <tr>
                                        <td>Discount: </td>
                                        <td>-Rp {getNumberWithCommas(subTotal - total)}</td>
                                    </tr> : <></>}
                                    <tr>
                                        <td>Total: </td>
                                        <td>Rp {getNumberWithCommas(total)}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='clear-sale button' onClick={() => { setProductBill({}); setDiscount(0) }}>
                                Clear Sale
                            </div>
                        </div>
                        <div>
                            <div className="row bill-buttons">
                                <div className="bill-button button" onClick={() => setSaveBillModal(true)}>
                                    Save Bill
                                </div>
                                <ReactToPrint
                                    trigger={() => <div className="bill-button button">
                                        Print Bill
                                    </div>}
                                    content={() => componentRef}
                                />
                                {/* <ComponentToPrint ref={(el) => (componentRef = el)} /> */}
                            </div>
                            <div className="row charges">
                                <div className="icon-button split-bill">
                                    <FaEquals />
                                    Split Bill
                                </div>
                                <div className="charge button" onClick={() => setChargeModal(true)}>
                                    Charge
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={saveBillModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Your bill has been saved!</div>
                <div style={{ textAlign: "center", fontSize: "120px" }}>👍</div>
                <div onClick={closeModal} className="popup-button button">close</div>
            </Modal>
            <Modal
                isOpen={chargeModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Charge</div>
                <div>Total: Rp {getNumberWithCommas(total)}</div>
                <label for="amount">Payment Amount</label>
                {/* <input type="number" id="amount" name="amount" placeholder="Amount" /> */}
                <input
                    type="number"
                    value={charge}
                    onChange={(e) => setCharge(e.target.value)}
                />
                <div>Change: {(charge - total < 0) ? "Not Sufficient" : "Rp " + getNumberWithCommas(charge - total)}</div>
                <div onClick={closeModal} className="popup-button button">OK</div>
            </Modal>
            <Modal
                isOpen={categoryModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>{categoryProducts[0]?.name}</div>
                {categoryProducts[0]?.products?.map((cp) => {
                    return <div onClick={() => { addProductBill(cp.id, cp.name, cp.price); closeModal(); }} className="row popupblock button">
                        <img src={`http://localhost:8000/image/${cp.id}`} alt={cp.name}></img>
                        <div className="name">{cp.name}</div>
                    </div>
                })}
                <div onClick={closeModal} className="popup-button button">OK</div>
            </Modal>
        </>
    );
}

// class ComponentToPrint extends React.Component {
//     render() {
//         return (

//         );
//     }
// }


export default PointOfSale;
