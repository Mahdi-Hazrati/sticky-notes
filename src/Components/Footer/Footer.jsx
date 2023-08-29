import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import "./Footer.css"

function Footer({ slogan, year, username, userurl, github_text, github_url }) {
    return (
        <footer>
            <div className="copy-right">
                {slogan}. <span>© {year} <a href={userurl}>{username}</a>.</span>
            </div>
            <div className="fix-on-github">
                {github_text} <a href={github_url}><AiFillGithub/> Github</a>
            </div>

        </footer>
    )
}

export default Footer