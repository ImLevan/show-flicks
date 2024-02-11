type VideoModalProps = {
    url_id: string;
    onRequestClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ url_id, onRequestClose }) => {

    return (
        <div id="video-modal" className="fixed top-0 left-0 w-full h-full mt-8 flex justify-center items-center z-40">
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="relative z-20 bg-black p-4 rounded w-2/3 h-2/3" >
                <button onClick={onRequestClose} className="absolute top-2 right-2 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M18 6l-12 12"
                        />
                        <path
                            d="M6 6l12 12"
                        />
                    </svg>
                </button>
                <iframe
                    title="video"
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${url_id}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoModal;