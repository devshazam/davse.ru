import { FC, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

import { fetchAdByIdForUser, saveChangesOfDiscount } from "../../api/discountAPI";

import globalParamsObject from '../../parameters/mainAppParameterObject'
// import {dimensionsToStyleObject} from '../../utils/helpFunctions'

import Events from './user-components/Events'
import Avito from './user-components/Avito'

import {useDispatch} from "react-redux";

const UserUpdateOne: FC = () => {
    const dispatch = useDispatch();
    
    const { adId } = useParams<{adId?: string}>();

    const [adsItem, setAdsItem] = useState<any>(null);
    const [flag, setFlag] = useState<number>(1);
    // const navigate = useNavigate();

    console.log(adsItem)
    function changeCreateObject(agent1:any){
        setAdsItem({...adsItem, ...agent1})
    }

    useEffect(() => {
        fetchAdByIdForUser({ adId })
            .then((data: any) => {
                setAdsItem(data);
            })
            .catch((error) => {
                if(error.response && error.response.data) {
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
                } 
            });
    }, []);

    function callSaveChanges(){
        if (!Object.values(adsItem).every((i:any) => Boolean(i))) {
            setFlag(0);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return;
        }
        saveChangesOfDiscount(adsItem)
            .then((data) => {
                // console.log(data);
                dispatch({type: "ALERT", payload: {modal: true, variant: 'success', text: `Успешно!`}});
                setTimeout(function() {window.location.replace("/ad-view/" + adId); }, 800); 
                // navigate("/ad-view/" + adId);
            })
            .catch((error: any) => {
                if(error.response && error.response.data) {
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
                } 
            });
    }
    return (
        <>
            <Row className="mb-3">
                <Col xs={12} md={6} className="wrap-image">
                    {adsItem ? 
                        <>
                            <div className="card-user_cab">
                                <div className="back_wrap_new" 
                                // style={{backgroundImage: `url(${adsItem.image})`}}
                                >
                                    <img  alt="Место для картинки" src={adsItem.image} className='card_img-user_cab' />
                                </div>
                            </div>
                            {/*<div style={{border: '1px solid black', margin: 'auto', backgroundColor: '#c5c5c5'}}>
                            <Image src={adsItem.image} id="goods-image" thumbnail style={adsItem.dimensions && {...dimensionsToStyleObject(JSON.parse(adsItem.dimensions))}}/> 
                            </div>*/}
                        </>
                     : 
                        <Spinner animation="border" />
                        }
                </Col>
                <Col xs={12} lg={6}>
                        <h3>Внесите изменения:</h3>
                    {adsItem ? (
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Район: {globalParamsObject.main.districtsNames[adsItem.district - 1]}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Адрес: {adsItem.address}
                            </ListGroup.Item>
                                <ListGroup.Item>
                                    <TextField label="Название:" variant="outlined" fullWidth
                                        // sx={{mb: 1, pr: { sm: 0, md: 1}, width: { sm: 'none', md: '50%'}}}
                                        error={Boolean(!adsItem.name && flag === 0)}
                                        value={adsItem.name}
                                        onChange={(e:any) => setAdsItem({...adsItem, name: e.target.value})}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <TextField label="Описание:" variant="outlined" fullWidth
                                        // sx={{mb: 1, pr: { sm: 0, md: 1}, width: { sm: 'none', md: '50%'}}}
                                        error={Boolean(!adsItem.description && flag === 0)}
                                        value={adsItem.description}
                                        onChange={(e:any) => setAdsItem({...adsItem, description: e.target.value})}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <TextField label="Цена:" variant="outlined" fullWidth
                                        // sx={{mb: 1, pr: { sm: 0, md: 1}, width: { sm: 'none', md: '50%'}}}
                                        error={Boolean(!adsItem.cost && flag === 0)}
                                        value={adsItem.cost}
                                        onChange={(e:any) => setAdsItem({...adsItem, cost: e.target.value})}
                                    />
                                </ListGroup.Item>
                         



                                        {adsItem.discount && 
                                        <>
                                            <ListGroup.Item>
                                                Категория скидки: {globalParamsObject.discounts.discountsCategory[adsItem.discountCategory - 1]}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <FormControl fullWidth >
                                                    <InputLabel  
                                                    // error={Boolean(!props.createObject.discount && props.flag == 0)}
                                                    >Размер скидки:</InputLabel>
                                                    <Select
                                                        // error={Boolean(!adsItem.discount && flag == 0)}
                                                        value={adsItem.discount}
                                                        onChange={(e:any) => setAdsItem({...adsItem, discount: e.target.value})}
                                                    >
                                                        { 
                                                            globalParamsObject.discounts.discountSize.map((item:any, index:any) => {
                                                                return(
                                                                    <MenuItem key={index + 1} value={item}>{item}%</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </ListGroup.Item>
                                            </>
                                        }



                                    {adsItem.startDate && 
                                        <ListGroup.Item>
                                            <Events changeCreateObject={changeCreateObject} createObject={adsItem}/>
                                        </ListGroup.Item>
                                    }

                                    {adsItem.avitoCategory && 
                                            <Avito changeCreateObject={changeCreateObject} createObject={adsItem}/>
                                    }

                            <Button variant="contained" fullWidth onClick={callSaveChanges}>
                                Сохранить изменения
                            </Button>

                        </ListGroup>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default UserUpdateOne;
