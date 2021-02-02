import Header from './header';
import React, { FunctionComponent } from 'react';
import { ConnectedRouter } from 'connected-next-router';

interface Props {}

const Layout: FunctionComponent<Props> = props => (
  <div className="home page-template-default page page-id-1490 custom-background et_pb_button_helper_class et_fixed_nav et_show_nav et_pb_gutter osx et_pb_gutters3 et_primary_nav_dropdown_animation_fade et_secondary_nav_dropdown_animation_fade et_pb_footer_columns_1_4__3_4 et_header_style_left et_pb_pagebuilder_layout et_right_sidebar et_divi_theme et-db et_minified_js et_minified_css">
    <div id="page-container">
      <div id="et-main-area">
        <div id="main-content">
          <ConnectedRouter>
            <Header />
            <div id="et-main-area">
              <div id="main-content">
                <article
                  id="post-1490"
                  className="post-1490 page type-page status-publish hentry"
                >
                  <div className="entry-content">
                    <div id="et-boc" className="et-boc">
                      <div className="et_builder_inner_content et_pb_gutters3">
                        <div className="et_pb_section et_pb_section_0 et_section_regular--with-curve u-display-block-small et_section_regular">
                          <div className="et_pb_row et_pb_row_0">
                            {props.children}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </ConnectedRouter>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
