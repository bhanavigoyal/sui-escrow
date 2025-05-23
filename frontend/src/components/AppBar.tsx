import { ConnectButton } from '@mysten/dapp-kit';
import { useNavigate } from "react-router-dom";

export const AppBar=()=>{
    const navigate = useNavigate();
    return <div className='flex justify-between items-center p-1 w-full'>
        <div className='flex items-center space-x-7'>
            <div className='flex items-center space-x-1 pr-3 cursor-pointer' onClick={()=>{
                navigate('/')
            }}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 100 100">
                    <path fill="#f1bc19" d="M78 13A1 1 0 1 0 78 15A1 1 0 1 0 78 13Z"></path><path fill="#fce0a2" d="M50 12A38 38 0 1 0 50 88A38 38 0 1 0 50 12Z"></path><path fill="#f1bc19" d="M84 12A4 4 0 1 0 84 20A4 4 0 1 0 84 12Z"></path><path fill="#ee3e54" d="M14 24A2 2 0 1 0 14 28A2 2 0 1 0 14 24Z"></path><path fill="#fbcd59" d="M78 75A2 2 0 1 0 78 79 2 2 0 1 0 78 75zM17 74A4 4 0 1 0 17 82 4 4 0 1 0 17 74z"></path><path fill="#ee3e54" d="M24 81A2 2 0 1 0 24 85A2 2 0 1 0 24 81Z"></path><path fill="#fff" d="M66.483 76.03399999999999A2.483 2.483 0 1 0 66.483 81 2.483 2.483 0 1 0 66.483 76.03399999999999zM16 47A1 1 0 1 0 16 49 1 1 0 1 0 16 47z"></path><path fill="#f1bc19" d="M86 30A1 1 0 1 0 86 32A1 1 0 1 0 86 30Z"></path><path fill="#fff" d="M80 64A2 2 0 1 0 80 68A2 2 0 1 0 80 64Z"></path><g><path fill="#508ecc" d="M49.275,23.017C41.207,23.397,35,30.347,35,38.424V46h6v-7.692c0-4.794,3.617-8.979,8.401-9.289 C54.643,28.68,59,32.831,59,38c0,1.657,1.343,3,3,3s3-1.343,3-3C65,29.475,57.889,22.611,49.275,23.017z"></path><path fill="#472b29" d="M50,24.4c7.499,0,13.6,6.101,13.6,13.6c0,0.882-0.718,1.6-1.6,1.6s-1.6-0.718-1.6-1.6 c0-5.735-4.665-10.4-10.4-10.4c-0.228,0-0.458,0.007-0.69,0.022c-5.445,0.353-9.711,5.046-9.711,10.686V44.6h-3.2v-6.176 c0-7.513,5.684-13.666,12.941-14.008C49.562,24.405,49.781,24.4,50,24.4 M50,23c-0.241,0-0.482,0.006-0.725,0.017 C41.207,23.397,35,30.347,35,38.424V46h6v-7.692c0-4.794,3.617-8.979,8.401-9.289C49.602,29.006,49.802,29,50,29 c4.971,0,9,4.029,9,9c0,1.657,1.343,3,3,3s3-1.343,3-3C65,29.716,58.284,23,50,23L50,23z"></path><path fill="#7dafe2" d="M60,72H40c-5.523,0-10-4.477-10-10V48c0-2.209,1.791-4,4-4h32c2.209,0,4,1.791,4,4v14 C70,67.523,65.523,72,60,72z"></path><path fill="#7dafe2" d="M60,72H40c-5.523,0-10-4.477-10-10V48c0-2.209,1.791-4,4-4h32c2.209,0,4,1.791,4,4v14 C70,67.523,65.523,72,60,72z"></path><path fill="#f1bc19" d="M31 49H69V55.5H31z"></path><path fill="#508ecc" d="M52,61c0-1.105-0.895-2-2-2s-2,0.895-2,2c0,0.653,0.318,1.227,0.801,1.592L48,67h4l-0.801-4.408 C51.682,62.227,52,61.653,52,61z"></path><path fill="#472b29" d="M66,45.4c1.434,0,2.6,1.166,2.6,2.6v14c0,4.742-3.858,8.6-8.6,8.6H40c-4.742,0-8.6-3.858-8.6-8.6 V48c0-1.434,1.166-2.6,2.6-2.6H66 M66,44H34c-2.209,0-4,1.791-4,4v14c0,5.523,4.477,10,10,10h20c5.523,0,10-4.477,10-10V48 C70,45.791,68.209,44,66,44L66,44z"></path><path fill="#472b29" d="M69 50h-3.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5H69c.276 0 .5.224.5.5S69.276 50 69 50zM62.5 50h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S62.776 50 62.5 50zM57.5 50H31c-.276 0-.5-.224-.5-.5S30.724 49 31 49h26.5c.276 0 .5.224.5.5S57.776 50 57.5 50zM69 56H31c-.276 0-.5-.224-.5-.5S30.724 55 31 55h38c.276 0 .5.224.5.5S69.276 56 69 56zM50 59.35c.91 0 1.65.74 1.65 1.65 0 .517-.241.995-.662 1.313-.106.08-.157.212-.134.342l.726 3.995h-3.161l.726-3.995c.024-.13-.028-.262-.134-.342C48.591 61.995 48.35 61.517 48.35 61 48.35 60.09 49.09 59.35 50 59.35M50 59c-1.105 0-2 .895-2 2 0 .653.318 1.227.801 1.592L48 67h4l-.801-4.408C51.682 62.227 52 61.653 52 61 52 59.895 51.105 59 50 59L50 59z"></path><path fill="#472b29" d="M29.44 52.325H36.77V52.676H29.44z" transform="rotate(-54.984 33.102 52.498)"></path><path fill="#472b29" d="M33.23 52.325H40.559999999999995V52.676H33.23z" transform="rotate(-54.984 36.892 52.498)"></path><path fill="#472b29" d="M36.94 52.325H44.269999999999996V52.676H36.94z" transform="rotate(-54.984 40.602 52.498)"></path><path fill="#472b29" d="M40.73 52.325H48.059999999999995V52.676H40.73z" transform="rotate(-54.984 44.392 52.498)"></path><path fill="#472b29" d="M44.44 52.325H51.769999999999996V52.676H44.44z" transform="rotate(-54.984 48.102 52.498)"></path><path fill="#472b29" d="M48.23 52.325H55.559999999999995V52.676H48.23z" transform="rotate(-54.984 51.892 52.499)"></path><path fill="#472b29" d="M51.94 52.325H59.269999999999996V52.676H51.94z" transform="rotate(-54.984 55.601 52.499)"></path><path fill="#472b29" d="M55.73 52.325H63.059999999999995V52.676H55.73z" transform="rotate(-54.984 59.391 52.499)"></path><path fill="#472b29" d="M59.44 52.325H66.77V52.676H59.44z" transform="rotate(-54.984 63.101 52.499)"></path><g><path fill="#472b29" d="M63.23 52.325H70.56V52.676H63.23z" transform="rotate(-54.984 66.89 52.499)"></path></g></g>
                    </svg>
                </div>
                <div>
                    TrustBox
                </div>
            </div>
            <div className='cursor-pointer' onClick={()=>{
                navigate('/escrows-view')
            }}>
                My Escrows
            </div>
            <div className='cursor-pointer' onClick={()=>{
                navigate('/escrows-received')
            }}>
                Recived Escrows
            </div>
            <div className='cursor-pointer' onClick={()=>{
                navigate('/vault')
            }}>
                Vault
            </div>
        </div>
        <div className='flex items-center space-x-2'>
            <div className='flex text-xs border border-amber-200 p-0.5 rounded-sm items-center space-x-0.5'>
                <div className='rounded-full border-green-200 border h-2 w-2 bg-green-200'></div>
                <div>
                    Devnet
                </div>
            </div>
            <div>
                <ConnectButton/>
            </div>
        </div>
    </div>
}