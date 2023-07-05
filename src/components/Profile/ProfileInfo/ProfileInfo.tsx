import React, { useEffect, useMemo, useRef, useState } from "react";
import c from './ProfileInfo.module.scss'
import ProfileStatus from "../ProfileStatus/ProfileStatus";

import userPhoto from '../../../images/ava.png'
import Contact from "./Contact/Contact";
import { contactsType, profileType } from "../../../types/types";


type PropsType = {
    profile: profileType,
    status: string,
    updateStatus: (newStatus: string) => void,
    isOwner: boolean,
    updateAvatar: (photo: File) => void,
    isAuth: boolean,
    isEditMode: boolean,
    setIsEditModeProfileOn: () => void
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, updateAvatar, isAuth, isEditMode, setIsEditModeProfileOn }) => {
    const avatarSrc = profile.photos.large || userPhoto

    const onNewAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            updateAvatar(e.target.files[0])
        }
    }
    const contactElements = []
    for (let contact in profile.contacts) {
        contactElements.push(<Contact key={contact} contactLink={profile.contacts[contact as keyof contactsType]} contactName={contact} />)
    }

    const onEditModeActivate = () => {
        setIsEditModeProfileOn()
    }

    return (
        <>
            {(profile) &&
                <div className={c.profileInfo}>
                    <div className={c.profileInfo__fon}></div>
                    <div className={`${c.profileInfo__avatar} ${c.avatar}`}>
                        <div className={c.avatar__overflow}></div>
                        {isOwner ?
                            <>
                                <label htmlFor="ava" className={c.avatar__labelImg}><img src={avatarSrc} alt="avatar" className={c.avatar__img} /></label>
                                <input id="ava" className={c.avatar__btnEdit} type="file" accept="image/*" onChange={onNewAvatarSelected} />
                            </>
                            :
                            <img src={avatarSrc} alt="avatar" className={c.avatar__img} />
                        }
                    </div>
                    <h1 className={c.profileInfo__name}>{profile.fullName}</h1>
                    <ul className={c.profileInfo__contacts}>
                        {contactElements}
                    </ul>
                    {profile.lookingForAJob &&
                        <div className={c.profileInfo__job}>
                            <label className={c.profileInfo__jobWarn}>Ищу работу! </label>
                            <p>{profile.lookingForAJobDescription} </p>
                        </div>
                    }
                    {profile.aboutMe &&
                        <p className={c.profileInfo__about}>{profile.aboutMe} </p>
                    }
                    {isOwner &&
                        <button className={c.profileInfo__btnEdit} onClick={onEditModeActivate}>Редактировать профиль</button>}
                    <div className={c.profileInfo__status}>
                        <ProfileStatus text={status} updateStatus={updateStatus} isOwner={isOwner} />
                    </div>

                </div >
            }
        </>
    )
}

export default React.memo(ProfileInfo);
