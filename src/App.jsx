import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PixabayApi from './services/PixabayApi';

import Modal from './components/Modal';
import Button from './components/Button/Button';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import CatchError from './components/ErrorViewApi/ErrorViewApi';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imagesLenght, setImagesLenght] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const [altToModal, setAltToModal] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    if (page > 2) {
       window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      console.log(document.documentElement.scrollHeight);
    }
  });

  function fetchImages() {
    const options = { searchQuery, page };

    setIsLoading(true);

    PixabayApi.fetchArticlesWithQuery(options)
      .then(images => {
        setImages(prevState => [...prevState, ...images]);
        setImagesLenght(images.length);
        setPage(page + 1);

        if (images.length === 0) {
          toast.error('Sorry, we didn it find anything. Try again!');
        } 
      })
      .catch(error => {
        setError(error);
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickImageGalleryItem = e => {
    setUrlModal(e.currentTarget.getAttribute('url'));
    setAltToModal(e.currentTarget.getAttribute('alt'));

    toggleModal();
  };

  return (
    <>
    {showModal && <Loader /> && (
        <Modal onClose={toggleModal} src={urlModal} alt={altToModal}></Modal>
      )}
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <CatchError />}
      <ImageGallery>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            alt={tags}
            src={webformatURL}
            url={largeImageURL}
            onClick={onClickImageGalleryItem}
          />
        ))}
      </ImageGallery>
      {isLoading && (
        <div className="LoaderContainer">
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {(imagesLenght === 12) && (
        <div className="ButtonContainer">
          <Button onClick={fetchImages} />
        </div>
      )}      
    </>
  );
}
