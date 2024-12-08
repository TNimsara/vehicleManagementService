// components/ui/Table.js
import React from 'react';

export const Table = ({ children }) => (
  <table className="min-w-full border border-gray-200">{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableRow = ({ children }) => <tr className="border-b">{children}</tr>;

export const TableHead = ({ children }) => (
  <th className="px-4 py-2 text-left">{children}</th>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2 border-b">{children}</td>
);
