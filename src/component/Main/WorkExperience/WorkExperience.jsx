import { useEffect, useState } from 'react'
import person from '../../../../personInfo.json'
import Title from '../../common/Title'
import './WorkExperience.css'
import { Popover } from 'antd'

export default function WorkExperience() {
    const { workExperience } = person
    const [isHovered, setIsHovered] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 750);

    var handleHover = index => {
        setIsHovered(index);
    }

    var handlerLeave = () => {
        setIsHovered(null);
    }


    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 750);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="experience">
            <Title partTitle="工作经历" />
            <div className="timeline">
                {
                    workExperience.map((item, index) => {
                        return (
                            <div className={`experienceItem ${index == isHovered ? `hover` : ``}`} key={index}>
                                {!isSmallScreen && <div className="experienceDate">{item.startDate}</div>}
                                {
                                    isSmallScreen ? (<Popover content="" title={item.startDate}>
                                        <div className='experienceCircle' >
                                        </div>
                                    </Popover>) : (<div className='experienceCircle' />)
                                }
                                <div className='experienceContent' onMouseEnter={() => handleHover(index)} onMouseLeave={handlerLeave}>
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