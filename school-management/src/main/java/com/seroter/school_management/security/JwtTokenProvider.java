package com.seroter.school_management.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @org.springframework.beans.factory.annotation.Value("${app.jwt-secret}")
    private String jwtSecretKey;

    @Value("${app-jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    //generate jwt token
    public String getJwtToken(String userName){
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + jwtExpirationDate);

        String token = Jwts.builder()
                .subject(userName)
                .issuedAt(currentDate)
                .expiration(expirationDate)
                .signWith(key())
                .compact();

        return token;
    }


    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
    }

    //get username from token
    public String getUsername(String token){
        return Jwts.parser()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //validate jwt token
    public boolean validateToken(String token) throws Exception {
        try {
            Jwts.parser()
                    .setSigningKey(key())
                    .build()
                    .parse(token);
            return true;
        }catch (MalformedJwtException e){
            throw new Exception("Malformed Jwt");
        }catch (ExpiredJwtException e){
            throw new Exception("Expired JWT token");
        }catch (UnsupportedJwtException e){
            throw new Exception("Unsupported JWT token");
        }catch (IllegalArgumentException e){
            throw new Exception("JWT claims string is empty");
        }

    }
}
