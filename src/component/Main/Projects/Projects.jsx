import Title from "../../common/Title";
import './Projects.css'

export default function Projects() {
  return (
    <>
      <Title partTitle="个人项目" />
      <div className="projects">
        <div className="projectItem">
          <div className="projectContent">
            <div>项目名称：React项目</div>
            <div>项目描述：使用React框架完成的项目</div>
            <div>项目技术：React、React-Router、Antd、Axios</div>
            <div>项目地址：<a href=""></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}