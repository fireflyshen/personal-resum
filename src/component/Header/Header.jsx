import './Header.css'
import person from '../../../personInfo.json'

export default function Header() {
    return (
        <div className="header">

            <div className='person'>
                <div>
                    <div className='personName'>{person.personalInfo.name}</div>
                </div>
                <div className='personInfo'>
                    <div className='personProperty'>
                        <div><i className='iconfont icon-xingbienan'></i><span>性别:</span>{person.personalInfo.gender}</div>
                        <div><i className='iconfont icon-nianling'></i><span>年龄:</span>{person.personalInfo.age}</div>
                        <div><i className='iconfont icon-gongzuonianxian'></i><span>工作年限:</span>{person.personalInfo.workyear}</div>
                    </div>
                    <div className='personContact'>
                        <div><i className='iconfont icon-youxiang'></i><span>邮箱:</span>{person.personalInfo.contact.email}</div>
                        <div><i className='iconfont icon-dianhua'></i><span>电话:</span>{person.personalInfo.contact.phone}</div>
                        <div><i className='iconfont icon-github-fill'></i><span>github:</span>{person.personalInfo.contact.github}</div>
                    </div>
                </div>
            </div>
            <div className='imgContainer'>
                <img src={person.personalInfo.image} alt="证件照" />
            </div>
        </div>
    )
}