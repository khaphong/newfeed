import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = '' }) => {
  return (
    <div className={`section-header ${className}`}>
      <h2 className="section-title">
        {title}
      </h2>
      <div className="section-divider"></div>
    </div>
  );
};

export default SectionHeader;
