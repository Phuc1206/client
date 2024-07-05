import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CourseItem() {
    return (
        <div className="flex items-center py-1.5 px-4 cursor-pointer hover:bg-slate-100">
            <img
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/136a8eb8f8798a032dcbd22a19eae294.jpeg?lk3s=a5d48078&nonce=86796&refresh_token=b60ec603cadd52289e47ce85aee8a5b7&x-expires=1720321200&x-signature=rL07gw1ibY%2BeiKFbHYHeFyootdM%3D&shp=a5d48078&shcp=81f88b70"
                alt="hoaa"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 ml-3">
                <h4 className="text-sm font-semibold">
                    <span>Name course</span>
                    <FontAwesomeIcon className="ml-1 text-sm text-sky-400" icon={faCheckCircle} />
                </h4>
                <span className="text-xs text-slate-400">Description</span>
            </div>
        </div>
    );
}
export default CourseItem;
