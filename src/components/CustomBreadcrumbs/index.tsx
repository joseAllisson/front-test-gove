import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface LinkProps {
    label: string;
    color?: string;
    href?: string;
}

interface CustomBreadcrumbsProps {
    breadcrumbs: LinkProps[];
    // separator: React.ReactNode;
}

export default function CustomBreadcrumbs({ breadcrumbs }: CustomBreadcrumbsProps) {
    const links = breadcrumbs.map(({ label, color = 'inherit', href }, index) => (
        href ? (
            <Link underline="hover" key={index} color={color} href={href}>
                {label}
            </Link>
        ) : (
            <Typography key={index} sx={{ color: 'text.primary' }}>
                {label}
            </Typography>
        )
    ));

    return (
        <Stack spacing={2}>
            {/* <Breadcrumbs separator="›" aria-label="breadcrumb">
        {links}
      </Breadcrumbs>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        {links}
      </Breadcrumbs> */}
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {links}
            </Breadcrumbs>
        </Stack>
    );
}