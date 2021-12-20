import { useState, useEffect } from 'react';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mapper } from './helper/mapper';
import * as API from './services/pixabay-api';

//rcc
//rfc

export default function App() {
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setShowSpinner(true);

    API.fetchPixabayImg(query, page)
      .then(images => {
        setImages(prevImages => [...prevImages, ...mapper(images.hits)]);

        if (images.hits.length === 0) {
          toast.warn(`Ничего не найдено`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(error => setError(error))
      .finally(() => {
        setShowSpinner(false);
        if (page > 1) {
          scrollTo();
        }
      });
  }, [page, query]);

  const changeInputValue = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickImg = imageModal => {
    setLargeImageURL(imageModal.srcLarge);
    toggleModal();
  };

  const clickLoadMore = e => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeInputValue} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {images && <ImageGallery images={images} onOpenModal={onClickImg} />}
      {images && images.length >= 12 && (
        <Button images={images} onClick={clickLoadMore} />
      )}

      {showSpinner && <Loader />}
      {showModal && <Modal onClose={toggleModal} imageModal={largeImageURL} />}

      {error &&
        toast.error(`${error}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        })}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     images: null,
//     query: '',
//     page: 1,
//     showModal: false,
//     showSpinner: false,
//     largeImageURL: '',
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       return this.getImages();
//     }
//   }

//   changeInputValue = query => {
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//     });
//   };

//   getImages = () => {
//     const { query, page } = this.state;

//     this.setState({ showSpinner: true });

//     API.fetchPixabayImg(query, page)
//       .then(images => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...mapper(images.hits)],
//         }));
//         if (images.hits.length === 0) {
//           toast.warn(`Ничего не найдено`, {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => {
//         this.setState({ showSpinner: false });
//         if (page > 1) {
//           this.scrollTo();
//         }
//       });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   onClickImg = imageModal => {
//     this.setState({ largeImageURL: imageModal.srcLarge });
//     this.toggleModal();
//   };

//   clickLoadMore = e => {
//     e.preventDefault();
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };
//   scrollTo = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { images, showModal, showSpinner, largeImageURL, error } = this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.changeInputValue} />
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />

//         {images && (
//           <ImageGallery images={images} onOpenModal={this.onClickImg} />
//         )}
//         {images && images.length >= 12 && (
//           <Button images={images} onClick={this.clickLoadMore} />
//         )}

//         {showSpinner && <Loader />}
//         {showModal && (
//           <Modal onClose={this.toggleModal} imageModal={largeImageURL} />
//         )}

//         {error &&
//           toast.error(`${error}`, {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             draggable: true,
//             progress: undefined,
//           })}
//       </div>
//     );
//   }
// }
