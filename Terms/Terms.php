<?php

namespace ArnauGM\BandAccountingBundle\Terms;

use DateTime;
use DateTimeZone;

class Terms
{
    /**
     * Current month
     *
     * @return string
     */
    public function getCurrentMonth()
    {
        return (new DateTime('', new DateTimeZone('UTC')))->format('n');
    }

    /**
     * Current year
     *
     * @return string
     */
    public function getCurrentYear()
    {
        return (new DateTime('', new DateTimeZone('UTC')))->format('Y');
    }

    /**
     * Term of the given month
     *
     * @param $month
     * @return int
     */
    public function getTerm($month)
    {
        return intval(ceil($month / 12 * 4));
    }

    /**
     * Term of the year and years back after subtracting given number of terms
     *
     * @param $initialTerm
     * @param $numTerms
     * @return array
     */
    public function subtractTerms($initialTerm, $numTerms)
    {
        $finalTerm = $initialTerm;
        $loops = 0;

        while ($numTerms > 0) {
            $finalTerm--;
            if ($finalTerm == 0) {
                $loops++;
                $finalTerm = 4;
            }
            $numTerms--;
        }

        return array(
            $finalTerm,
            $loops,
        );
    }

    public function getInitialDateFromFilter($filter)
    {
        if (is_null($filter)) {
            throw new \InvalidArgumentException('Filter can not be null');
        }

        $termsAgo = $filter - 1;
        return $this->getInitialDateTermsAgo($termsAgo);
    }

    private function getInitialDateTermsAgo($numTerms)
    {
        $currentMonth = intval($this->getCurrentMonth());
        $currentTerm = $this->getTerm($currentMonth);
        $currentYear = intval($this->getCurrentYear());

        list($periodsFirstTerm, $yearsBack) = $this->subtractTerms($currentTerm, $numTerms);

        $initialMonthPerTerm = [1, 4, 7, 10];
        $initialDateMonth = $initialMonthPerTerm[$periodsFirstTerm - 1];
        $initialDateYear = $currentYear - $yearsBack;

        $initialDate = $initialDateYear . '-' . str_pad($initialDateMonth, 2, '0', STR_PAD_LEFT) . '-01';

        return $initialDate;
    }
}