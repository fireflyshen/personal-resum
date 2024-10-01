import person from '../../../../personInfo.json'
import Title from '../../common/Title'
import './WorkExperience.css'


export default function WorkExperience() {
    const { workExperience } = person
    return (

        <div className="experience">     
            <Title partTitle="工作经历"/>
            <div className="timeline">
                {
                    workExperience.map((item, index) => {
                        return (
                            <div className="experienceItem" key={index}>
                                <div className="experienceDate">{item.startDate}</div>
                                <div className='experienceCircle'>
                                </div>
                                <div className='experienceContent'>
                                    <div className="experienceContent">
                                        <div>公司：{item.company}</div>
                                        <div>年限：{item.year}</div>
                                        <div>职位：{item.title}</div>
                                        <div>工作内容：{item.description}</div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>



    )
}