<?xml version="1.0" encoding="ISO-8859-1"?>
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
		<xsl:template match="/books">
 			<html><head><title>Book Store</title></head>
 			<body ><center>
				<br/> <h1> Books list </h1>
				<table border="1" >
					<tr><th>Title</th><th>Author</th><th>Price</th></tr>
					<xsl:for-each select="book">
					<tr><td>
					<xsl:value-of select="title"/>
					</td><td>
					<xsl:value-of select="author"/>
					</td><td>
					<xsl:value-of select="price"/>
					</td></tr>
					</xsl:for-each>
				</table>	</center></body></html>
 		</xsl:template>
	</xsl:stylesheet>
