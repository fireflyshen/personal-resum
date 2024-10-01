import Title from "../../common/Title";
import './EducationExperience.css';
import person from '../../../../personInfo.json';
export default function EducationExperience() {


    return (

        <>
            <Title partTitle="教育经历" />
            <div className="education">
                <div>
                    学校：{person.personalInfo.education.school}
                </div>
                <div>
                    专业：{person.personalInfo.education.major}
                </div>

                <div>
                    学历：本科
                </div>
                <div>
                    gpa:{person.personalInfo.education.gpa}
                </div>
            </div>

        </>

    )
}