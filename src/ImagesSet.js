import React, {useEffect, useState} from 'react';
import './ImagesSet.css';
import {createApi} from 'unsplash-js';

const unsplash = createApi({ accessKey: `${process.env.REACT_APP_ACCESSKEY}` });


const columnStyle = {
    margin: '10px',
    width: '33.3333%',
}

const imageStyle = {
    borderRadius: '5px',
    width:'100%',
    marginTop:'10px',
    fontSize:'20px',
    transform: 'translate3d(0,0,0)',
    opacity: 1,
    transition: 'transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 500ms'
   
}

const assetLoaded = {
    transform: 'translate3d(0,0,0)',
    opacity: 1,
    transition: 'transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 500ms'
}

const disableTransition = {
    transition: 'none',
}

const buttonStyle = {
    color: 'white',
    backgroundColor: 'grey',
    fontSize: '16px',
    margin: '20px',
    width: '300px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    textTransform: 'uppercase'
}

const ImagesSet = () => {
    const [colA, setAPhotos] = useState([]);
    const [colB, setBPhotos] = useState([]);
    const [colC, setCPhotos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    var colAHeight = 0;
    var colBHeight = 0;
    var colCHeight = 0;

    const fetchImages = async (pageNumber) => {
        setPageNumber(pageNumber);
        unsplash.search.getPhotos({
            query:'dogs',
            perPage: '10',
            page: pageNumber
        }).then(result => {
            const imageArray = result.response.results;
            imageArray.forEach((img) => {
                const width = img.width;
                const height = img.height;
                const aspectRatio = height/width;
           
                if(colAHeight <= colBHeight && colAHeight <= colCHeight) {
                    colAHeight+=aspectRatio;
                    setAPhotos(colA => [...colA, img])
                } else if(colBHeight < colAHeight && colBHeight < colCHeight) {
                    colBHeight+=aspectRatio;
                    setBPhotos(colB => [...colB, img])
                 }else { // colC Height is shorter
                    colCHeight+=aspectRatio;
                    setCPhotos(colC => [...colC, img])
                }
            });
        }).catch(err => {
            console.log(err);
        })
        
    }
    useEffect(() => {
        fetchImages(pageNumber);
    }, []);

    return(
        <div>
        <div style={{display:'flex'}}>
            <div style={columnStyle}>
                {colA.map((img, i) => {
                    return(
                        <img key={i} className="fadeInn one" src={img.urls.regular}/>
                    )
                })}
            </div>
            <div style={columnStyle}>
                {colB.map((img, i) => {
                    return(
                        <img key={i} className="fadeInn three" src={img.urls.regular}/>
                    )
                })}
            </div>
            <div style={columnStyle}>
                {colC.map((img, i) => {
                    return(
                        <img key={i} className="fadeInn two" src={img.urls.regular}/>
                    )
                })}
            </div>
        </div>
        <button style={buttonStyle} onClick={() => fetchImages(pageNumber+2)}>Load dogs...</button>
        </div>
    )
}

export default ImagesSet;

