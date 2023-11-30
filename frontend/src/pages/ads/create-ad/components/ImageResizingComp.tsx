import React, { useState, useEffect }from 'react';
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import Button from '@mui/material/Button';
import Resizer from "react-image-file-resizer";
import {useDispatch} from "react-redux";

import {dimensionsToStyleObject} from '../../../../utils/helpFunctions'

const ImageResizingComp = (props:any) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [countOne, setCountOne] = useState<number>(0);
    const [dimensions, setDimensions] = useState<number[] | null>(null);
    const [imageInsert, setImageInsert] = useState<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
            if(!imageUrl) return;
                let img: any = document.querySelector("#img");
                if(Number(img.clientHeight) < 44 ){
                    setCountOne(countOne+ 1)
                }else{
                    setDimensions([+img.clientWidth, +img.clientHeight]);
                }
    }, [countOne, imageUrl])

    useEffect(() => {
        if(imageInsert && dimensions)
        dispatch({type: "IMG", payload: {img: imageInsert, dimensions: JSON.stringify(dimensions)}})
}, [countOne, imageUrl])

    // 

    // https://www.npmjs.com/package/react-image-file-resizer
    function resizeFile(file:any) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                "JPEG",
                80,
                0,
                (uri: any) => {
                    // setImageUrl(uri);
                    resolve(uri)
                },
                "file"
            );
        });
    }
    async function asd(event:any):Promise<void> {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0], 111)

            try {
                const image:any = await resizeFile(event.target.files[0]);
                setImageUrl(URL.createObjectURL(image));
                setImageInsert(image)
            } catch (err) {
                console.log(err);
            }

        }
    }

    // function dataURIToBlob(dataURI: any){ // При  необходимости можно найти URL артинки с помощью этой ф-ции:
    //     const splitDataURI = dataURI.split(",");
    //     const byteString =
    //         splitDataURI[0].indexOf("base64") >= 0
    //             ? atob(splitDataURI[1])
    //             : decodeURI(splitDataURI[1]);
    //     const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    //     const ia = new Uint8Array(byteString.length);
    //     for (let i = 0; i < byteString.length; i++){ ia[i] = byteString.charCodeAt(i)}
    //     return new Blob([ia], { type: mimeString });
    // };

    // useEffect(() => {
    //     if(!imageOne) return
    //     setImageUrl(URL.createObjectURL(dataURIToBlob(imageOne)));
    // }, [imageOne])



    // ==========================================================================================================
    return (
        <>


                <Col xs={12} md={6}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                       Загрузить файл
                        <input accept="image/jpeg, image/png"
                            type="file"
                            hidden
                               onChange={asd}
                        />
                    </Button>
                    <p style={{fontSize: 12}}>* При нажатии на кнопку "Загрузить файл" картинка автоматически преобразуется в формат jpeg и размер 500х500 пикселей</p>
            </Col>
            <Col xs={12} md={6}>
                <h6>Здесь появится ваша картинка после оптимизации:</h6>
                    {
                        dimensions ?
                        <div className='' style={{border: '1px solid black', margin: 'auto', width: '80%', backgroundColor: '#c5c5c5'}}>
                            <img  alt="Место для картинки" src={imageUrl} style={{...dimensionsToStyleObject(dimensions), boxSizing: 'border-box'}}/>
                        </div>
                        :
                        <img id="img" alt="Место для картинки" src={imageUrl} />
                    }
                {Boolean(!imageUrl && props.flag == 0) &&
                    <p style={{color: 'red', fontSize: '15px', border: '1px solid red'}}>Картинка не загружена!</p>
                }
            </Col>



        </>
    );
};

export default ImageResizingComp;
