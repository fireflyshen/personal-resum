/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './SettingBorad.css';


import { ChromePicker } from 'react-color';

const useShadowRoot = () => {
    const shadowRootRef = useRef(null);
    const [shadowRoot, setShadowRoot] = useState(null);
    useEffect(() => {
        console.log('useShadowRoot', shadowRootRef);
        if (shadowRootRef.current && !shadowRootRef.current.shadowRoot) {
            const root = shadowRootRef.current.attachShadow({ mode: 'open' })
            setShadowRoot(root);
        }
    }, []);




    return [shadowRootRef, shadowRoot];
}


const withShadowRoot = (Component) => {

    return function ShadowDOMWrapper(props) {
        // eslint-disable-next-line no-unused-vars
        const [shadowRootRef, shadowRoot] = useShadowRoot();

        return (
            <div ref={shadowRootRef}>
                {shadowRoot && (createPortal(<Component {...props} />, shadowRoot))}
            </div>
        )
    }
}


const ShadowComponent = ({ onMouseDown, position, initPosition }) => {

    const colorPicker = useRef(null);

    const [color, setColor] = useState("#002fa7");
    const [isShow, setIsShow] = useState(false);


    const handlerChange = (color) => {
        setColor(color.hex);
        document.documentElement.style.setProperty('--main-color', color.hex);
    }


    const handlerOutSide = (e) => {
        e.stopPropagation();
        console.log('click');

        if (colorPicker.current && !colorPicker.current.contains(e.target)) {
            setIsShow(false);
        }



    };




    useEffect(() => {
        if (isShow) {
            document.addEventListener('click', handlerOutSide)
        } else {
            document.removeEventListener('click', handlerOutSide);
        }

        return () => {
            document.removeEventListener('click', handlerOutSide);
        };

    }, [isShow])






    const hanlderClick = (e) => {
        e.stopPropagation();
        setIsShow(true);
    }





    return (

        <>

            <style>

                {
                    `
                    .SettingCircle {
                        position: absolute;
                        right:0px;
                        top: ${initPosition.y}px;
                        width: 30px;
                        height: 30px;
                        background-image: linear-gradient( 89.5deg,  rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3% );
                        border-radius: 50%  0 0 50% ;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 0 20px 0 rgba(0,0,0,0.3);
                        transform: translateY(${position.y - initPosition.y}px);
                    }

                    .SettingCircle:hover {
                        cursor: pointer;
                    }

                     .icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    
                    }

                    .icon svg {
                        position: a;
                    }
                        
                    .colorPicker {
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        background-color: #fff;
                        padding: 10px;
                        position: absolute;
                        right: 30px;
                        top: 0;
                    }
                    `
                }
            </style>
            <div className='SettingCircle' onMouseDown={onMouseDown} onClick={hanlderClick} >
                <div className='icon'>
                    <svg t="1727978149077" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M545.784454 962.539206l-65.943898 0c-29.341259 0-54.624085-25.281803-54.624085-54.615898L425.216471 868.462574c0-9.623171-7.826246-20.911262-16.690124-23.680329l-1.566682-0.611937-55.725162-23.104207-0.880043-0.494257c-8.153704-4.41045-22.017456-2.376117-28.55229 4.187369l-28.17469 28.123524c-9.930163 9.977235-23.239284 15.494902-37.432541 15.494902-14.195304 0-27.507494-5.517667-37.487799-15.541975l-46.682205-46.630017c-20.60427-20.603247-20.6319-54.233182-0.069585-74.974575l28.15013-28.106128c6.637164-6.574742 8.676613-20.599154 4.253884-28.909423l-0.831948-1.768273-23.164582-56.128345-0.26913-0.682545c-2.803859-9.03477-14.279215-17.394159-23.611767-17.394159l-39.631626 0c-29.391401 0-52.861952-24.065092-52.861952-53.193503l0-65.943898c0-28.770254 22.998807-51.754734 52.919257-51.754734l39.575344 0c9.081843 0 20.803815-8.830109 23.666002-18.057261l0.567935-1.476631 23.163559-57.088206 0.505513-0.913812c4.40431-8.220219 2.319835-22.224164-4.2897-28.830629l-28.04166-28.087709c-9.964956-9.921977-15.486716-23.216771-15.502066-37.396725-0.01535-14.201443 5.492084-27.53717 15.507182-37.552268l46.6556-46.614667c9.94142-9.985422 23.248494-15.503089 37.432541-15.503089 0.001023 0 0 0 0.001023 0 14.184047 0 27.490098 5.51869 37.46938 15.540951l28.039613 28.05087c6.557346 6.525624 20.500916 8.596795 28.655643 4.231371l0.893346-0.478907 57.375755-23.64963c8.836249-2.731204 16.634866-14.037714 16.634866-23.719214l0-39.632649c0-28.967752 24.777313-52.095495 54.624085-52.095495L545.784454 64.076364c29.161157 0 52.370765 22.636556 52.370765 52.095495l0 39.632649c0 9.127891 8.709359 20.85498 17.767666 23.674189l1.51654 0.577145 56.639998 23.113417 0.923022 0.509606c8.202822 4.424776 22.184255 2.353604 28.788673-4.254907l28.163433-27.912723c9.895371-9.94142 23.179932-15.33936 37.352723-15.33936 0.019443 0 0.040932 0 0.060375 0 14.18814 0 27.508517 5.375427 37.516452 15.384385l46.709835 46.554292c10.004865 9.960863 15.524578 23.254633 15.524578 37.47552 0 14.18814-5.498224 27.506471-15.479553 37.532825l-28.16855 28.152177c-6.580882 6.610558-8.640798 20.771069-4.204765 29.107945l0.478907 0.896416 23.654746 57.956993c2.902096 9.255805 14.635325 18.114566 23.686469 18.114566l39.132252 0 0-0.573051c27.629267 0 52.188616 22.984481 52.188616 52.327786l0 65.998133c0 29.590945-22.985504 53.138244-51.746548 53.138244l-39.630602 0c-9.337669 0-20.84884 8.372691-23.686469 17.423835l-0.580215 1.51654-23.086811 56.240909-0.468674 0.860601c-4.419659 8.30413-2.393513 22.320355 4.169973 28.855188l28.135804 28.02017c10.031471 10.029424 15.539928 23.350824 15.537881 37.541011-0.004093 14.186094-5.514597 27.505447-15.518438 37.505195l-46.747697 46.682205c-9.920954 9.964956-23.219841 15.506159-37.406958 15.506159-0.019443 0-0.040932 0-0.060375 0-14.192234 0-27.514657-5.514597-37.518498-15.517415l-28.039613-28.095895c-6.490831-6.490831-20.807908-8.575306-28.887934-4.206812l-0.951675 0.514723-57.93755 23.680329c-9.087982 2.859118-17.823947 14.594393-17.823947 23.691585l0 39.460734C598.155219 937.76394 574.45954 962.539206 545.784454 962.539206zM421.86719 806.892287c25.192775 8.370645 44.282552 34.650171 44.282552 61.570287l0 39.460734c0 7.114025 6.569626 13.68365 13.691837 13.68365L545.784454 921.606958c6.496971 0 12.461823-6.043646 12.461823-13.68365L558.246277 868.462574c0-26.273387 19.516496-53.131081 44.901653-61.58052l53.859675-22.062482c23.62814-12.116969 56.342216-7.098675 75.118861 11.6749l28.009937 28.1532c2.432399 2.430352 5.678326 3.837398 9.179057 3.837398 0.00614 0 0.011256 0 0.01535 0 3.482311 0 6.726192-1.39886 9.135054-3.820002l46.780443-46.738487c2.436492-2.436492 3.783163-5.724375 3.78521-9.224082 0-3.495614-1.344624-6.774287-3.787256-9.216919l-28.106128-27.998681c-18.693758-18.609847-23.762193-51.349505-11.773138-75.036997l22.083971-53.603849c8.374738-25.167193 35.224246-44.51382 61.578474-44.51382l39.630602 0c7.745405 0 10.8143-7.086395 10.8143-13.229303l0-65.998133c0-6.862291-5.116531-12.07399-11.256368-12.302187l0 1.479701-39.132252 0c-26.236548 0-53.099359-20.149922-61.585637-45.735647l-22.083971-54.261834c-11.960403-23.654746-6.913457-56.502875 11.728112-75.228355l28.16855-28.192086c2.430352-2.441609 3.78828-5.764284 3.78828-9.295714 0-3.498684-1.334391-6.762007-3.759627-9.17394l-46.741557-46.577828c-2.462075-2.462075-5.736655-3.734044-9.234315-3.734044-0.004093 0-0.010233 0-0.013303 0-3.465938 0-6.700609 1.255597-9.105379 3.671623l-28.198226 28.037567c-18.703991 18.710131-51.417043 23.734564-75.000158 11.69025l-53.865815-22.072715c-25.403576-8.388041-44.934398-35.255968-44.934398-61.60508l0-39.632649c0-7.253194-5.517667-12.186554-12.461823-12.186554l-65.943898 0c-7.517207 0-13.691837 5.51869-13.691837 12.186554l0 39.632649c0 27.027563-19.107173 53.336766-44.325531 61.643965l-53.501518 21.99699c-23.834848 12.168134-55.857169 7.234775-74.878384-11.69639l-28.130687-28.115338c-2.441609-2.451842-5.690606-3.787256-9.152451-3.787256-3.462868-0.001023-6.704702 1.334391-9.117658 3.758604l-46.690392 46.64639c-2.438539 2.438539-3.784186 5.710049-3.781116 9.207709 0.004093 3.474125 1.339508 6.716982 3.762697 9.128915l28.068266 28.121478c18.698874 18.690688 23.782659 51.389414 11.808954 74.973552l-22.124903 54.813397c-8.413624 25.616424-35.281551 45.783743-61.603033 45.783743l-39.575344 0c-6.630001 0-13.010315 3.411703-13.010315 10.822486l0 65.943898c0 6.942109 5.753027 13.284561 12.95301 13.284561l39.631626 0c26.380834 0 53.195549 19.35072 61.524239 44.537356l22.182208 53.629431c12.027941 23.731494 6.918573 56.449663-11.863189 75.05644l-28.022217 27.949562c-5.021364 5.066389-5.048993 13.348006 0.010233 18.409279l46.713928 46.653553c2.452865 2.464121 5.695722 3.794419 9.168824 3.794419 3.472078 0 6.711865-1.336438 9.124821-3.759627l28.181853-28.122501c18.641569-18.730597 51.440579-23.752983 75.011414-11.642155L421.86719 806.892287z" fill="#272636" p-id="1710"></path><path d="M513.734504 731.880873c-120.639614 0-218.786958-98.147344-218.786958-218.786958s98.147344-218.786958 218.786958-218.786958 218.786958 98.147344 218.786958 218.786958S634.375142 731.880873 513.734504 731.880873zM513.734504 334.324368c-98.573039 0-178.769546 80.195483-178.769546 178.769546s80.195483 178.769546 178.769546 178.769546 178.769546-80.195483 178.769546-178.769546S612.308567 334.324368 513.734504 334.324368z" fill="#272636" p-id="1711"></path></svg>
                </div>
                <div className='colorPicker' ref={colorPicker} style={{ display: isShow ? 'block' : 'none' }}>
                    <ChromePicker color={color} onChangeComplete={handlerChange} />
                </div>
            </div>
        </>

    )
};

const ShadowDomContent = withShadowRoot(ShadowComponent)

export { ShadowDomContent };