<?php

namespace RootDiamoons\BandAccountingBundle\Utils;

class Math
{
    public static function mod($num, $mod) {
        return ($mod + ($num % $mod)) % $mod;
    }
}