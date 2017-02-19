<?php

namespace RootDiamoons\BandAccountingBundle\Controller;

use Exception;
use RootDiamoons\BandAccountingBundle\Entity\Activity;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\PropertyNormalizer;
use Symfony\Component\Serializer\Serializer;

class ActivityController extends Controller
{
    public function indexAction()
    {
        return $this->render('RootDiamoonsBandAccountingBundle:Activity:index.html.twig');
    }

    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('RootDiamoonsBandAccountingBundle:Activity');

        $activities = $repository->getActivities();
        $totals = $this->totals($activities);

        $response = new JsonResponse();
        $response->setData(
            array(
                'activities' => $activities,
                'income' => $totals['income'],
                'expenses' => $totals['expenses'],
                'total' => $totals['total'],
            )
        );

        return $response;
    }

    private function totals($activities)
    {
        $total = 0;
        $income = 0;
        $expenses = 0;

        foreach ($activities as $activity) {
            $amount = $activity['amount'];
            if ($amount > 0) {
                $income += $amount;
            } else {
                $expenses += -$amount;
            }
            $total += $amount;
        }

        return array(
            'total' => $total,
            'income' => $income,
            'expenses' => $expenses
        );
    }

    public function createAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();

        if (!array_key_exists('concept', $data) ||
            !array_key_exists('amount', $data) ||
            !array_key_exists('dateValue', $data)
        ) {
            $httpCode = 400;
            $message = 'Validation error';

            return $this->errorResponse($httpCode, $message);
        }

        $concept = $data['concept'];
        $amount = $data['amount'];
        $dateValue = new \DateTime($data['dateValue']);

        $activity = new Activity($concept, $amount, $dateValue);

        try {
            $em->persist($activity);
            $em->flush();

            return new JsonResponse(
                array(
                    'status' => 'ok',
                    'id' => $activity->getId(),
                    'date' => $activity->getDate(),
                ), 200
            );

        } catch (Exception $e) {
            return $this->errorResponse(500, $e->getMessage());
        }
    }

    public function updateAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();

        if (!array_key_exists('concept', $data) ||
            !array_key_exists('amount', $data) ||
            !array_key_exists('dateValue', $data)
        ) {
            $httpCode = 400;
            $message = 'Validation error';

            return $this->errorResponse($httpCode, $message);
        }

        $id = $data['id'];
        $concept = $data['concept'];
        $amount = $data['amount'];
        $dateValue = new \DateTime($data['dateValue']);

        $activity = $em->getRepository('RootDiamoonsBandAccountingBundle:Activity')->find($id);

        $activity->setConcept($concept);
        $activity->setAmount($amount);
        $activity->setDateValue($dateValue);

        try {
            $em->persist($activity);
            $em->flush();

            return new JsonResponse(
                array(
                    'status' => 'ok',
                    'id' => $activity->getId(),
                ), 200
            );

        } catch (Exception $e) {
            return $this->errorResponse(500, $e->getMessage());
        }
    }

    private function errorResponse($httpCode, $message)
    {
        return new JsonResponse(
            array(
                'status' => 'error',
                'errors' => $message,
            ), $httpCode
        );
    }
}
