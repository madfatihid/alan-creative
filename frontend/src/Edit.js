// import logo from './logo.svg';
import { HiTrash } from 'react-icons/hi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GrAdd } from 'react-icons/gr'
import { TbDiscount2 } from 'react-icons/tb';
import { TiDelete } from 'react-icons/ti'
import './App.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';

const options = [
    { name: 'chocolate', id: 'Chocolate' },
    { name: 'strawberry', id: 'Strawberry' },
    { name: 'vanilla', id: 'Vanilla' },
  ];

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: 'calc(100% - 200px)'
    },
};

function Edit() {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    const [blocks, setBlocks] = useState([]);
    const [block, setBlock] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        loadAll();
    }, []);

    useEffect(() => {
        console.log(block);
    }, [block]);

    function loadBlocks() {
        axios.get('/blocks').then((response) => {
            setBlocks(response.data);
        });
    }


    const [blockModal, setBlockModal] = useState(false);
    const [discountModal, setDiscountModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [productModal, setProductModal] = useState(false);


    const [discountId, setDiscountId] = useState(0);
    const [discountName, setDiscountName] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    
    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);

    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    function upsertDiscount() {
        let url = `/discounts/${discountId}`;
        if (discountId === 0) {
            url = `/discounts`;
        }
        axios.post(url, {
            name: discountName,
            percentage: discountAmount
        }).then((response) => {
            loadAll();
            closeModal();
        });
    }

    function upsertCategory() {
        let url = `/categories/${categoryId}`;
        if (categoryId === 0) {
            url = `/categories`;
        }
        axios.post(url, {
            name: categoryName,
            products: selectedOption
        }).then((response) => {
            console.log(response);
            loadAll();
            closeModal();
        });
    }

    function upsertProduct() {
        let url = `/products/${productId}`;
        if (productId === 0) {
            url = `/products`;
        }
        axios.post(url, {
            name: productName,
            price: productPrice,
            image: selectedImage
        }, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then((response) => {
            loadAll();
            closeModal();
        });
    }

    // function openModal() {
    //     setSaveBillModal(true);
    // }
    // function loadCateogryProduct(id) {
    //     setCategoryProducts([]);
    //     axios.get(`/categories/${id}`).then((response) => {
    //         setCategoryProducts(response.data);
    //     });
    //     setCategoryModal(true);
    // }

    function closeModal() {
        setBlockModal(false);
        setDiscountModal(false);
        setCategoryModal(false);
        setProductModal(false);
    }

    function deleteBlock(id) {
        axios.delete(`/blocks/${id}`).then((response) => {
            loadBlocks();
        });
    }
    function updateBlock(id, type) {
        axios.post(`/blocks/${block}`, {
            id: id,
            type: type
        }).then((response) => {
            loadBlocks();
            closeModal();
        });
    }

    function loadAll() {
        loadProducts();
        loadCategories();
        loadDiscounts();
        loadBlocks();
    }

    function deleteItem(id, type) {
        axios.delete(`/${type}/${id}`).then((response) => {
            loadAll();
        });
    }

    function loadProducts() {
        axios.get(`/products`).then((response) => {
            setProducts(response.data);
        });
    }
    function loadCategories() {
        axios.get(`/categories`).then((response) => {
            setCategories(response.data);
        });
    }

    function loadDiscounts() {
        axios.get(`/discounts`).then((response) => {
            setDiscounts(response.data);
        });
    }

    return (
        <>
            <div className="row edit">
                <div className="products">
                    {blocks.map((block) => {
                        if (block.product != null) {
                            return (
                                <div className='block'>
                                    <div className='image' style={{ backgroundImage: `url(http://localhost:8000/image/${block.product.id})` }}></div>
                                    <div className='caption'>{block.product.name}</div>
                                    <div className='delete button' onClick={() => deleteBlock(block.id)}><TiDelete /></div>
                                </div>
                            );
                        } else if (block.category != null) {
                            return (
                                <div className='block'>
                                    <div className='image'>{block.category.name.substring(0, 2)}</div>
                                    <div className='caption'>{block.category.name}</div>
                                    <div className='delete button' onClick={() => deleteBlock(block.id)}><TiDelete /></div>
                                </div>
                            );
                        } else if (block.discount != null) {
                            return (
                                <div className='block'>
                                    <div className='image'><TbDiscount2 /></div>
                                    <div className='caption'>{block.discount.name}</div>
                                    <div className='delete button' onClick={() => deleteBlock(block.id)}><TiDelete /></div>
                                </div>
                            );
                        }
                        return <div className='block empty button' onClick={() => {
                            loadAll();
                            setBlock(block.id); setBlockModal(true);
                        }}>
                            <div className='image' style={{ height: '100%', background: 'none', color: '#aaa' }}><GrAdd /></div>
                        </div>;
                    })}
                </div>
                <div className="lists">
                    <Tabs>
                        <TabList>
                            <Tab className="button">Product</Tab>
                            <Tab className="button">Category</Tab>
                            <Tab className="button">Discount</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='create button' onClick={() => {
                                setProductId(0);
                                setProductName('');
                                setProductPrice(0);
                                setProductModal(true);
                                setSelectedImage(null);
                            }}>Create Product</div>
                            <div className='inside'>
                                {products.map((cp) => {
                                    return <div className="row popupblock button" key={cp.id}>
                                        <div className='row' onClick={() => {
                                            setProductId(cp.id);
                                            setProductName(cp.name);
                                            setProductPrice(cp.price);
                                            setProductModal(true);
                                            setSelectedImage(null);
                                        }}>
                                            <img src={`http://localhost:8000/image/${cp.id}`} alt={cp.name}></img>
                                            <div className="name">{cp.name}</div>
                                        </div>
                                        <div className="trash" onClick={() => deleteItem(cp.id, 'products')}><HiTrash /></div>
                                    </div>
                                })}</div>
                        </TabPanel>
                        <TabPanel>
                            <div className='create button' onClick={() => {
                                setSelectedOption(null);
                                setCategoryId(0);
                                setCategoryName('');
                                setCategoryModal(true);
                            }}>Create Category</div>
                            {categories.map((cp) => {
                                return <div className="row popupblock button" key={cp.id}>

                                    <div className='row' onClick={() => {
                                        setSelectedOption(categories.find(x => x.id === cp.id).products)
                                        setCategoryId(cp.id);
                                        setCategoryName(cp.name);
                                        // setDiscountAmount(cp.percentage);
                                        setCategoryModal(true);
                                    }}>
                                        <div className='image'>{cp.name.substring(0, 2)}</div>
                                        <div className="name">{cp.name}</div>
                                    </div>

                                    <div className="trash" onClick={() => deleteItem(cp.id, 'categories')}><HiTrash /></div>
                                </div>
                            })}
                        </TabPanel>
                        <TabPanel>
                            <div className='create button' onClick={() => {
                                setDiscountId(0);
                                setDiscountName('');
                                setDiscountAmount(0);
                                setDiscountModal(true);
                            }}>Create Discount</div>
                            {discounts.map((cp) => {
                                return <div className="row popupblock button" key={cp.id}>
                                    <div className='row' onClick={() => {
                                        setDiscountId(cp.id);
                                        setDiscountName(cp.name);
                                        setDiscountAmount(cp.percentage);
                                        setDiscountModal(true);
                                    }}>
                                        <div className='image'><TbDiscount2 /></div>
                                        <div className="name">{cp.name}</div>
                                    </div>
                                    <div className="trash" onClick={() => deleteItem(cp.id, 'discounts')}><HiTrash /></div>
                                </div>
                            })}
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <Modal
                isOpen={blockModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Add to Block</div>
                {categories.map((cp) => {
                    return <div onClick={() => { updateBlock(cp.id, 'category'); }} className="row popupblock button">
                        <div className='image'>{cp.name.substring(0, 2)}</div>
                        <div className="name">{cp.name}</div>
                    </div>
                })}
                {discounts.map((cp) => {
                    return <div onClick={() => { updateBlock(cp.id, 'discount'); }} className="row popupblock button">
                        <div className='image'><TbDiscount2 /></div>
                        <div className="name">{cp.name}</div>
                    </div>
                })}
                {products.map((cp) => {
                    return <div onClick={() => { updateBlock(cp.id, 'product'); }} className="row popupblock button">
                        <img src={`http://localhost:8000/image/${cp.id}`} alt={cp.name}></img>
                        <div className="name">{cp.name}</div>
                    </div>
                })}
                <div onClick={closeModal} className="popup-button button">Close</div>
            </Modal>
            <Modal
                isOpen={discountModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Discount</div>
                <label for="name">Name</label>
                <input
                    type="text"
                    value={discountName}
                    name='name'
                    onChange={(e) => setDiscountName(e.target.value)}
                /><label for="name">Percentage</label>
                <input
                    type="number"
                    min={0}
                    max={100}
                    value={discountAmount}
                    name='percentage'
                    onChange={(e) => setDiscountAmount(e.target.value)}
                />
                <div onClick={upsertDiscount} className="popup-button button">OK</div>
            </Modal>
            <Modal
                isOpen={categoryModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Category</div>
                <label for="name">Name</label>
                <input
                    type="text"
                    value={categoryName}
                    name='name'
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  isMulti={true}
                  options={products}
                  getOptionLabel ={(option)=>option.name}
                  getOptionValue ={(option)=>option.id}
                />
                <div onClick={upsertCategory} className="popup-button button">OK</div>
            </Modal>
            <Modal
                isOpen={productModal}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Product</div>
                <label>Name</label>
                <input
                    type="text"
                    value={productName}
                    name='name'
                    onChange={(e) => setProductName(e.target.value)}
                />
                <label>Price</label>
                <input
                    type="number"
                    value={productPrice}
                    name='price'
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <div>
                <label>Image</label>
                    {(selectedImage || productId !== 0) && (
                        <div>
                            <img alt="not fount" width={"250px"} src={(selectedImage === null) ? `http://localhost:8000/image/${productId}` : URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}
                    <br />

                    <br />
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                        }}
                    />
                </div>
                <div onClick={upsertProduct} className="popup-button button">OK</div>
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


export default Edit;
