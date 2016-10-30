<?php

namespace RootDiamoons\BandAccountingBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * ActivityRepository
 *
 */
class ActivityRepository extends EntityRepository
{
    public function getActivity($id)
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a')
            ->where('a.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getSingleResult(Query::HYDRATE_ARRAY);

        return $qb;
    }

    public function getActivities()
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a')
            ->setMaxResults(3)
            ->orderBy('a.dateValue', 'DESC')
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);

        return $qb;
    }
}
