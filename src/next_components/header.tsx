import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header id="main-header" data-height-onload="42">
      <div className="container clearfix et_menu_container">
        <div className="logo_container">
          <span className="logo_helper" />
          <Link href="/">
            <a>
              <picture>
                <img
                  className="logo-header webpexpress-processed"
                  src="https://www.dismoi.io/wp-content/uploads/2020/05/logo-dismoi-WHITE-edited.png"
                  alt="DisMoi"
                  id="logo"
                  data-height-percentage="54"
                />
              </picture>
            </a>
          </Link>
        </div>
        <div id="et-top-navigation" data-height="42" data-fixed-height="40">
          <nav id="top-menu-nav">
            <ul id="top-menu" className="nav">
              <li
                id="menu-item-3096"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3096"
              >
                <Link href={'/sources'}>
                  <a>Vos sources d&rsquo;information</a>
                </Link>
              </li>
              <li
                id="menu-item-1101"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1101"
              >
                <a href="https://www.dismoi.io/informer/">Contribuer</a>
              </li>
              <li
                id="menu-item-906"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-906"
              >
                <Link href="/aide/">
                  <a>Aide</a>
                </Link>
              </li>
            </ul>
          </nav>
          <div id="et_mobile_nav_menu">
            <div className="mobile_nav closed">
              <span className="select_page">Sélectionner une page</span>
              <span className="mobile_menu_bar mobile_menu_bar_toggle"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
