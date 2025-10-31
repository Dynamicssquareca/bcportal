import React from 'react';

const CategoryNav = () => {
    return (
        <div className='cate-nav'>
            <div className="category-bar">
                <div className="categories">
                    <a href="#" className="active">Automation</a>
                    <span className="divider">|</span>
                    <a href="#">Digital Transformation</a>
                    <span className="divider">|</span>
                    <a href="#">Industrial Data & AI</a>
                    <span className="divider">|</span>
                    <a href="#">Innovation</a>
                    <span className="divider">|</span>
                    <a href="#">Leadership</a>
                    <span className="divider">|</span>
                    <a href="#">People & Skills</a>
                    <span className="divider">|</span>
                    <a href="#">Sustainability</a>
                </div>
            </div>

        </div>
    );
}

export default CategoryNav;
