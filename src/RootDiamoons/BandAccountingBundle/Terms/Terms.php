<?php

namespace RootDiamoons\BandAccountingBundle\Terms;

use DateTime;
use DateTimeZone;
use RootDiamoons\BandAccountingBundle\Utils\Math;

class Terms
{
    public function getCurrentMonth()
    {
        return (new DateTime('', new DateTimeZone('UTC')))->format('n');
    }

    public function getCurrentYear()
    {
        return (new DateTime('', new DateTimeZone('UTC')))->format('Y');
    }

    public function getInitialDateFromFilter($filter)
    {
        return $this->getLastTermsStart($filter);
    }

    private function getLastTermsStart($numTerms)
    {
        $currentMonth = intval($this->getCurrentMonth());
        $lastTermStart = $this->getLastTermsStartFromGivenTerm($numTerms, $currentMonth / 12 * 4);

        return $lastTermStart;
    }

    private function getLastTermsStartFromGivenTerm($numTerms, $currentTerm)
    {
        $initialMonths = [1, 4, 7, 10];
        $currentYear = intval($this->getCurrentYear());

        $lastTermStartMonth = $initialMonths[Math::mod(($currentTerm - 1) - ($numTerms - 1), 4)];
        $lastTermStartYear = $lastTermStartMonth > $initialMonths[$currentTerm - 1] ? ($currentYear - 1) : $currentYear;
        $lastTermStart = $lastTermStartYear.'-'.str_pad($lastTermStartMonth, 2, '0', STR_PAD_LEFT).'-01';

        return $lastTermStart;
    }
}